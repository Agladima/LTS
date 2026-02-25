export const REGISTRATION_DRAFT_KEY = "lts_registration_draft";
export const REGISTRATION_RESULT_KEY = "lts_registration_result";
export const PREMIUM_LISTENERS_LOCAL_COUNT_KEY = "lts_premium_listeners_local_count";

export type RegistrationDraft = {
  profileImageUploaded?: boolean;
  profileImageData?: string;
  profileImageName?: string;
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
  try {
    const current = readRegistrationDraft();
    const next = { ...current, ...partial };
    window.localStorage.setItem(REGISTRATION_DRAFT_KEY, JSON.stringify(next));
  } catch (error) {
    console.error("Failed to store registration draft:", error);
  }
};

export const writeRegistrationResult = (result: unknown) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(REGISTRATION_RESULT_KEY, JSON.stringify(result));
};

export const readRegistrationResult = <T = unknown>(): T | null => {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(REGISTRATION_RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const clearRegistrationDraft = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(REGISTRATION_DRAFT_KEY);
};

export const readPremiumListenersLocalCount = (): number => {
  if (!isBrowser()) return 0;
  const raw = window.localStorage.getItem(PREMIUM_LISTENERS_LOCAL_COUNT_KEY);
  if (!raw) return 0;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

export const writePremiumListenersLocalCount = (count: number) => {
  if (!isBrowser()) return;
  const safeCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
  window.localStorage.setItem(
    PREMIUM_LISTENERS_LOCAL_COUNT_KEY,
    String(safeCount),
  );
};

export const incrementPremiumListenersLocalCount = () => {
  if (!isBrowser()) return 0;
  const next = readPremiumListenersLocalCount() + 1;
  writePremiumListenersLocalCount(next);
  return next;
};
