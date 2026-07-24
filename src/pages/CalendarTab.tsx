// Calendar tab — Outlook push Phase 1 (outlook-calendar-sync.md).
// Events created here push to Outlook on create/edit/cancel; Outlook is
// always the complete picture of the schedule, so this tab is a per-case
// working list, not a calendar view.
import { useCallback, useEffect, useState } from 'react';
import type { AccountInfo } from '@azure/msal-browser';
import type { CaseRecord } from '../domain/types';
import {
  CALENDAR_EVENT_TYPES, formatEventWhen,
  type CalendarEvent, type CalendarEventType,
} from '../domain/calendar';
import { ATTORNEY_USER } from '../domain/billing';
import { db } from '../data';
import { outlookConfigured, OUTLOOK_CALENDAR_NAME } from '../outlook/config';
import { getSignedInAccount, signIn, disconnect } from '../outlook/auth';
import { syncEvent, syncAllPending } from '../outlook/sync';

export default function CalendarTab({ caseRec }: { caseRec: CaseRecord }) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [editing, setEditing] = useState<CalendarEvent | 'new' | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [busy, setBusy] = useState(false);
  const [syncNote, setSyncNote] = useState('');

  const refresh = useCallback(() => {
    db.listEventsForCase(caseRec.id).then(setEvents);
  }, [caseRec.id]);

  useEffect(() => {
    refresh();
    getSignedInAccount().then(setAccount);
  }, [refresh]);

  const connect = async () => {
    setBusy(true);
    try {
      setAccount(await signIn());
      const { synced, failed } = await syncAllPending(db);
      setSyncNote(`Connected. Pushed ${synced} queued event${synced === 1 ? '' : 's'}${failed ? `, ${failed} failed` : ''}.`);
      refresh();
    } catch (e) {
      setSyncNote(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  const syncNow = async () => {
    setBusy(true);
    try {
      const { synced, failed } = await syncAllPending(db);
      setSyncNote(`Pushed ${synced} event${synced === 1 ? '' : 's'}${failed ? `, ${failed} failed` : ''}.`);
      refresh();
    } finally {
      setBusy(false);
    }
  };

  const disconnectOutlook = async () => {
    await disconnect();
    setAccount(null);
    setSyncNote('Disconnected — new and edited events queue locally until reconnected.');
  };

  const cancelEvent = async (ev: CalendarEvent) => {
    if (!window.confirm(`Cancel "${ev.title}"? The Outlook copy will be removed.`)) return;
    const updated = await db.updateEvent(ev.id, { status: 'cancelled', syncStatus: 'pending' });
    await db.appendReviewLog({
      entityType: 'calendar_event', entityId: ev.id, action: 'cancelled', user: ATTORNEY_USER, oldValue: ev.title,
    });
    await syncEvent(db, updated, caseRec);
    refresh();
  };

  const syncBadge = (ev: CalendarEvent) => {
    if (ev.syncStatus === 'synced') {
      return <span className="badge sync-synced" title={ev.lastSyncAt ? `Pushed ${new Date(ev.lastSyncAt).toLocaleString()}` : undefined}>✓ In Outlook</span>;
    }
    if (ev.syncStatus === 'error') return <span className="badge sync-error" title={ev.syncError}>Push failed</span>;
    return outlookConfigured
      ? <span className="badge sync-pending">Queued for Outlook</span>
      : <span className="badge sync-off" title="Set up the Outlook connection to push events — docs/outlook-setup.md">Not pushed — Outlook not connected</span>;
  };

  const scheduled = events.filter((e) => e.status === 'scheduled');
  const cancelled = events.filter((e) => e.status === 'cancelled');

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
          <div>
            <h3>Outlook push</h3>
            <div className="small muted">
              One-way: events created here appear on the “{OUTLOOK_CALENDAR_NAME}” calendar in Outlook and stay
              current on edit and cancel. Outlook remains the complete picture of the schedule.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {!outlookConfigured && <span className="badge sync-off">Not configured — see docs/outlook-setup.md</span>}
            {outlookConfigured && !account && (
              <button className="btn small" onClick={connect} disabled={busy}>Connect Outlook</button>
            )}
            {outlookConfigured && account && (
              <>
                <span className="small muted">{account.username}</span>
                <button className="btn small secondary" onClick={syncNow} disabled={busy}>Sync now</button>
                <button className="btn small secondary" onClick={disconnectOutlook} disabled={busy}>Disconnect</button>
              </>
            )}
          </div>
        </div>
        {syncNote && <div className="small muted" style={{ marginTop: 6 }}>{syncNote}</div>}
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3>Events</h3>
          <button className="btn small" onClick={() => setEditing('new')}>+ New event</button>
        </div>

        {editing && (
          <EventForm
            caseRec={caseRec}
            existing={editing === 'new' ? null : editing}
            onDone={() => { setEditing(null); refresh(); }}
            onCancel={() => setEditing(null)}
          />
        )}

        <table className="list" style={{ marginTop: 10 }}>
          <thead>
            <tr><th>When</th><th>Event</th><th>Type</th><th>Location</th><th>Outlook</th><th></th></tr>
          </thead>
          <tbody>
            {scheduled.map((ev) => (
              <tr key={ev.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{formatEventWhen(ev)}</td>
                <td><strong>{ev.title}</strong>{ev.notes && <div className="small muted">{ev.notes}</div>}</td>
                <td><span className={`badge evt-${ev.eventType}`}>{CALENDAR_EVENT_TYPES.find((t) => t.value === ev.eventType)?.label ?? ev.eventType}</span></td>
                <td className="muted">{ev.location ?? '—'}</td>
                <td>{syncBadge(ev)}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <button className="btn small secondary" onClick={() => setEditing(ev)}>Edit</button>{' '}
                  <button className="btn small danger" onClick={() => cancelEvent(ev)}>Cancel</button>
                </td>
              </tr>
            ))}
            {scheduled.length === 0 && (
              <tr><td colSpan={6} className="muted">No events yet. Hearings from criminal intake and deadline-engine dates will land here too once those modules ship.</td></tr>
            )}
          </tbody>
        </table>

        {cancelled.length > 0 && (
          <details style={{ marginTop: 10 }}>
            <summary className="small muted">Cancelled ({cancelled.length})</summary>
            <table className="list" style={{ marginTop: 6 }}>
              <tbody>
                {cancelled.map((ev) => (
                  <tr key={ev.id} className="muted">
                    <td style={{ whiteSpace: 'nowrap' }}>{formatEventWhen(ev)}</td>
                    <td>{ev.title}</td>
                    <td>{syncBadge(ev)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        )}
      </div>
    </div>
  );
}

function EventForm({ caseRec, existing, onDone, onCancel }: {
  caseRec: CaseRecord;
  existing: CalendarEvent | null;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(existing?.title ?? '');
  const [eventType, setEventType] = useState<CalendarEventType>(existing?.eventType ?? 'hearing');
  const [allDay, setAllDay] = useState(existing?.allDay ?? false);
  const [startDate, setStartDate] = useState(existing ? existing.startLocal.split('T')[0] : '');
  const [startTime, setStartTime] = useState(existing && !existing.allDay ? existing.startLocal.split('T')[1] ?? '' : '');
  const [endTime, setEndTime] = useState(
    existing && !existing.allDay && existing.endLocal ? existing.endLocal.split('T')[1] ?? '' : '',
  );
  const [location, setLocation] = useState(existing?.location ?? '');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [saving, setSaving] = useState(false);

  const valid = title.trim() !== '' && startDate !== '' && (allDay || startTime !== '');

  const save = async () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      const startLocal = allDay ? startDate : `${startDate}T${startTime}`;
      const endLocal = !allDay && endTime ? `${startDate}T${endTime}` : undefined;
      const fields = {
        title: title.trim(), eventType, allDay, startLocal, endLocal,
        location: location.trim() || undefined, notes: notes.trim() || undefined,
      };
      let rec: CalendarEvent;
      if (existing) {
        rec = await db.updateEvent(existing.id, { ...fields, syncStatus: 'pending' });
        await db.appendReviewLog({
          entityType: 'calendar_event', entityId: rec.id, action: 'edited', user: ATTORNEY_USER, newValue: rec.title,
        });
      } else {
        rec = await db.createEvent({ ...fields, caseId: caseRec.id, status: 'scheduled', syncStatus: 'pending' });
        await db.appendReviewLog({
          entityType: 'calendar_event', entityId: rec.id, action: 'created', user: ATTORNEY_USER, newValue: rec.title,
        });
      }
      await syncEvent(db, rec, caseRec);
      onDone();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="filters" style={{ marginTop: 8, padding: 10, background: '#f7f8fa', borderRadius: 6, alignItems: 'flex-end' }}>
      <label className="fld" style={{ minWidth: 240 }}><span className="lab">Title</span>
        <input type="text" value={title} placeholder="e.g. Motion hearing — 146th District Court" onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="fld"><span className="lab">Type</span>
        <select value={eventType} onChange={(e) => setEventType(e.target.value as CalendarEventType)}>
          {CALENDAR_EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </label>
      <label className="check" style={{ paddingBottom: 8 }}>
        <input type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
        <span>All day</span>
      </label>
      <label className="fld"><span className="lab">Date</span>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      {!allDay && (
        <>
          <label className="fld"><span className="lab">Start</span>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
          <label className="fld"><span className="lab">End (optional)</span>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>
        </>
      )}
      <label className="fld"><span className="lab">Location</span>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label className="fld" style={{ minWidth: 220 }}><span className="lab">Notes</span>
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <button className="btn small" onClick={save} disabled={!valid || saving}>
        {existing ? 'Save changes' : 'Add event'}
      </button>
      <button className="btn small secondary" onClick={onCancel}>Cancel</button>
    </div>
  );
}
