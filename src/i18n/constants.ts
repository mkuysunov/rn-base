export const SUPPORTED_LANGUAGES = ["ru", "en"] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: AppLanguage = "ru";

export const isSupportedLanguage = (
  value: string | null | undefined
): value is AppLanguage => SUPPORTED_LANGUAGES.includes(value as AppLanguage);
