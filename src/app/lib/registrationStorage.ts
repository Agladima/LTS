export const REGISTRATION_DRAFT_KEY = "lts_registration_draft";
export const REGISTRATION_RESULT_KEY = "lts_registration_result";

export type RegistrationDraft = {
  profileImageUploaded?: boolean;
  fullName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  userType?: string;
  status?: string;
  genre?: string;
  firstParty?: string;
  expectations?: string;
  socialHandle?: string;
  studioOppositeSex?: string;
  allergiesRemedy?: string;
  emergencyContact?: string;
  emergencyContactRelationship?: string;
  suggestions?: string;
  marketingConsent?: boolean;
};

const isBrowser = () => typeof window !== "undefined";

export const readRegistrationDraft = (): RegistrationDraft => {
  if (!isBrowser()) return {};
  const raw = window.localStorage.getItem(REGISTRATION_DRAFT_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as RegistrationDraft;
  } catch {
    return {};
  }
};

export const writeRegistrationDraft = (partial: RegistrationDraft) => {
  if (!isBrowser()) return;
  const current = readRegistrationDraft();
  const next = { ...current, ...partial };
  window.localStorage.setItem(REGISTRATION_DRAFT_KEY, JSON.stringify(next));
};

export const writeRegistrationResult = (result: unknown) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(REGISTRATION_RESULT_KEY, JSON.stringify(result));
};
