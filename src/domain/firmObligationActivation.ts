// FIRM OBLIGATIONS — turning a catalog template and HIS inputs into an activation.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 5 and FOD-30 — the
// form pre-fills the lead and the weight from the template and REQUIRES the date;
// the weekend rule starts at `unknown` and must be touched or left; "last period
// completed" exists only on a serial kind and is optional (FOM-4). The template's
// own stated dates are shown BESIDE the date input as a hint and are never copied
// into it: every activation takes his date, in the product (FOD-9).
//
// Shared by the register's Activate… form and the demo fixture (FOD-21), so the
// fixture is built by exactly the path Michael's own activations take.

import {
  DEFAULT_LEAD_DAYS, defaultMissedPeriods,
  type FirmObligationCreate, type Precision, type RecurrenceRule, type Weight, type WeekendRule,
} from './firmObligations';
import type { FirmObligationTemplate } from './firmObligationTemplates';

export interface ActivationInputs {
  /** The rule carrying HIS date(s). */
  recurrence: RecurrenceRule;
  weekendRule: WeekendRule;
  /** Pre-filled from the template (FOD-30); his to change. */
  leadDays?: number;
  /** Pre-filled from the template (FOD-30); his to change. */
  weight?: Weight;
  /** FOM-4 — serial kinds only, optional. */
  lastPeriodCompleted?: string;
  /** FOD-16 — interval kinds only, optional. */
  lastDone?: string;
  notes?: string;
  /** false = "Add as inactive" (the seeded-inactive templates; DECISION 9B's BOI row). */
  active?: boolean;
}

/** When a template's Weight cell names neither class, the activation form starts at
 *  `routine` — a build default, reported, and his to change on the form. */
export const WEIGHT_WHEN_TEMPLATE_NAMES_NONE: Weight = 'routine';

export function activationFromTemplate(t: FirmObligationTemplate, inputs: ActivationInputs): FirmObligationCreate {
  const kind = inputs.recurrence.kind;
  const precision: Precision = kind === t.kind ? t.precision : 'day';
  return {
    name: t.name,
    category: t.category,
    ownerScope: t.ownerScope,
    templateKey: t.key,
    recurrence: inputs.recurrence,
    precision,
    missedPeriods: kind === t.kind ? t.missedPeriods : defaultMissedPeriods(kind),
    conditionalPerPeriod: t.conditionalPerPeriod,
    weekendRule: inputs.weekendRule,
    leadDays: inputs.leadDays ?? t.leadDays ?? DEFAULT_LEAD_DAYS,
    weight: inputs.weight ?? t.weight ?? WEIGHT_WHEN_TEMPLATE_NAMES_NONE,
    lastPeriodCompleted: inputs.lastPeriodCompleted,
    lastDone: inputs.lastDone,
    sourceNote: t.sourceNote,
    appliesIf: t.appliesIf,
    notes: inputs.notes,
    active: inputs.active ?? true,
  };
}
