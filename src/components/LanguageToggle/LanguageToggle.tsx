import { useTranslation } from "react-i18next";

import { SUPPORTED_LANGUAGES } from "@/i18n/constants";

import { LanguageToggleSegment } from "./LanguageToggleSegment";
import { LanguageToggleTrack } from "./LanguageToggleStyles";
import type { LanguageToggleProps } from "./LanguageToggleTypes";

export const LanguageToggle = (props: LanguageToggleProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();

  return (
    <LanguageToggleTrack>
      {SUPPORTED_LANGUAGES.map((language) => (
        <LanguageToggleSegment
          key={language}
          label={t(`settings.languages.${language}`)}
          active={language === value}
          onPress={() => onChange(language)}
        />
      ))}
    </LanguageToggleTrack>
  );
};
