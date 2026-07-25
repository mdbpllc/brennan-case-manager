// Demo-mode chapter set — real public-domain files, lazy-loaded so the
// chapter text stays out of the main bundle (see README.md for provenance).

const FIXTURES: Record<string, () => Promise<{ default: string }>> = {
  'CP.18': () => import('./CP.18.htm?raw'),
  'CP.41': () => import('./CP.41.htm?raw'),
  'CP.146': () => import('./CP.146.htm?raw'),
  'PR.55': () => import('./PR.55.htm?raw'),
  'HS.327': () => import('./HS.327.htm?raw'),
};

export const FIXTURE_KEYS = Object.keys(FIXTURES);

export function hasFixture(code: string, chapter: string): boolean {
  return `${code}.${chapter}` in FIXTURES;
}

export async function loadFixture(code: string, chapter: string): Promise<string | null> {
  const loader = FIXTURES[`${code}.${chapter}`];
  return loader ? (await loader()).default : null;
}
