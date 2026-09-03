// Small helpers the fixture walk needs, kept out of the test file so the test
// reads as assertions rather than as plumbing.

import { providerSortKey, type CaseProvider } from '../../domain/caseProviders';
import type { DisclosureFixtures } from '../../data/disclosureFixtures';

export { planFacility } from '../assembly';

/** The D-13 chain over the fixture set, assembled from its own three sources. */
export function providerSortKeyFor(
  p: CaseProvider,
  fx: DisclosureFixtures,
): string | undefined {
  const mine = fx.caseProviderIndividuals.filter((i) => i.caseProviderId === p.id);
  const ids = new Set(mine.map((i) => i.id));
  return providerSortKey(p, {
    individuals: mine,
    visitDates: fx.caseProviderVisits.filter((v) => ids.has(v.individualId)).map((v) => v.visitDate),
    billServiceStarts: fx.bills.filter((b) => b.facilityPartyId === p.facilityPartyId)
      .map((b) => b.serviceStart),
  });
}
