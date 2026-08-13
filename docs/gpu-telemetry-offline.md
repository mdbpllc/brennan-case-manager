# GPU machine — telemetry offline lockdown (RULED 2026-08-12)

**Canonical repo path:** `docs/gpu-telemetry-offline.md` — NEW file (small durable ops note; the
GPU environment itself lives outside the repo, but the posture ruling and its recipe belong on the
record).
**Ruling (Michael, 2026-08-12 Central, by widget):** the transcription stack's telemetry packages
(`wandb`, `sentry-sdk`, NVIDIA OneLogger — pulled in by NeMo, smoke-tested tone-only 2026-08-09)
stay INSTALLED but are forced OFFLINE, machine-wide, **before any privileged audio is processed**.
Closes the open telemetry-posture item.

## The recipe (Michael's hand, on the GPU machine)

Set these environment variables machine-wide (System Properties → Environment Variables on
Windows, or the activation script of the Python environment the stack runs in — set them in BOTH
if unsure):

```
WANDB_MODE=offline
WANDB_DISABLED=true
```

PowerShell, machine-wide, run once as admin:

```powershell
[Environment]::SetEnvironmentVariable('WANDB_MODE','offline','Machine')
[Environment]::SetEnvironmentVariable('WANDB_DISABLED','true','Machine')
```

Then three verifications, run in the stack's environment:

1. **sentry-sdk is inert without a DSN — verify none is configured:** search the environment and
   any config files for `SENTRY_DSN`. Expected result: not set anywhere. If one appears, remove
   it. (No DSN = sentry initializes as a no-op; nothing to disable, just confirm nothing enabled
   it.)
2. **OneLogger / NeMo experiment logging:** in whatever NeMo config or script the transcription
   run uses, confirm experiment-manager logging is not creating remote loggers (wandb logger
   creation off / not configured). With WANDB_MODE=offline set machine-wide, a stray wandb logger
   writes locally instead of transmitting — the env var is the backstop; the config check is the
   belt.
3. **Re-run the 08-09 tone smoke test and confirm it still passes** with the variables set —
   this proves the lockdown didn't break the working stack.

Optional hardening, if wanted later: a Windows Firewall outbound-block rule scoped to the stack's
`python.exe` makes the posture mechanically verifiable rather than configuration-dependent. Not
required by the ruling; recorded as the available next notch.

## Status line

The rule this note enforces: **no privileged audio is processed on this machine until the
variables above are set and verification 3 passes.** Once done, Michael says so in any session and
the queue records the item closed.
