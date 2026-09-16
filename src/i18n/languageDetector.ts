import { getLocales } from "expo-localization";
import type { LanguageDetectorModule } from "i18next";

import { preferencesStorage } from "@/services/storage/preferencesStorage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";

import { DEFAULT_LANGUAGE, isSupportedLanguage } from "./constants";

const detectDeviceLanguage = () => {
  const deviceLanguage = getLocales()[0]?.languageCode;

  return isSupportedLanguage(deviceLanguage)
    ? deviceLanguage
    : DEFAULT_LANGUAGE;
};

export const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  detect: () => {
    const savedLanguage = preferencesStorage.getItem(STORAGE_KEYS.language);

    return isSupportedLanguage(savedLanguage)
      ? savedLanguage
      : detectDeviceLanguage();
  },
  cacheUserLanguage: (language) => {
    preferencesStorage.setItem(STORAGE_KEYS.language, language);
  },
};
