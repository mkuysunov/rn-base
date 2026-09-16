import type { AppLanguage } from "@/i18n/constants";

export interface LanguageToggleProps {
  value: AppLanguage;
  onChange: (language: AppLanguage) => void;
}
