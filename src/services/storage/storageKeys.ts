export const STORAGE_KEYS = {
  language: "language",
  accessToken: "session.accessToken",
  refreshToken: "session.refreshToken",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
