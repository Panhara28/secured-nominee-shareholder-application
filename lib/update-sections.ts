// URL slug for each request section's /update-request/{section} page → its
// wizard step number.
export const UPDATE_SECTION_STEPS = {
  company: 1,
  "nominee-shareholder": 2,
  "beneficial-owner": 3,
  agreement: 4,
} as const;

export type UpdateSection = keyof typeof UPDATE_SECTION_STEPS;

// Update type sent with a per-section update and stored by the API
// (BeneficiaryRequest.updateType / RequestRevision.updateType), by step.
// Labels live under `requestTypes.*` in messages.
export const UPDATE_TYPE_BY_STEP: Record<number, string> = {
  1: "UPDATE_REQUEST_COMPANY_INFO",
  2: "UPDATE_REQUEST_NOMINEE_SHAREHOLDER_INFO",
  3: "UPDATE_REQUEST_BENEFICIAL_OWNER",
  4: "UPDATE_REQUEST_AGREEMENT",
};

export const STEP_BY_UPDATE_TYPE: Record<string, number> = Object.fromEntries(
  Object.entries(UPDATE_TYPE_BY_STEP).map(([step, type]) => [type, Number(step)]),
);
