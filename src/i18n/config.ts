import i18next from "i18next";
import ICU from "i18next-icu";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants";
import { languageDetector } from "./languageDetector";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

export const resources = {
  ru: { translation: ru },
  en: { translation: en },
} as const;

void i18next
  .use(ICU)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18next;
