export type RegistrationStatsResponse = Record<string, unknown>;

const toNumber = (value: unknown): number => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.-]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
};

const pickNumber = (
  source: RegistrationStatsResponse,
  keys: string[],
): number => {
  for (const key of keys) {
    if (key in source) return toNumber(source[key]);
  }
  return 0;
};

export const getListeningProfilesCount = (
  stats: RegistrationStatsResponse,
): number =>
  pickNumber(stats, [
    "total_registrations",
    "registrations",
    "registration_count",
    "total_registration_count",
    "total_registered",
    "total_users",
    "users",
    "count",
    "total_profiles",
    "profiles",
    "profile_count",
    "listening_profiles",
  ]);

export const getPremiumListenersCount = (
  stats: RegistrationStatsResponse,
): number =>
  pickNumber(stats, [
    "premium_listeners",
    "premium_count",
    "total_premium",
    "premium_users",
    "upgraded_users",
    "paid_registrations",
    "payments",
  ]);
