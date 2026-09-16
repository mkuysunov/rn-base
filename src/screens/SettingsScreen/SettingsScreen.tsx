import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import { YStack } from "tamagui";

import { LanguageToggle } from "@/components/LanguageToggle";
import {
  type AppLanguage,
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
} from "@/i18n/constants";
import { queryClient } from "@/providers/ReactQueryProvider";
import { useLogout } from "@/services/auth/useAuth";
import { selectUser, useSessionStore } from "@/store/sessionStore";
import { Button } from "@/ui-kit/Button";
import { Screen } from "@/ui-kit/Screen";
import { Typography } from "@/ui-kit/Typography";

import {
  SETTINGS_CONTENT_PROPS,
  SETTINGS_TAB_EDGES,
} from "./SettingsScreenConstants";

export const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const user = useSessionStore(selectUser);
  const clearSession = useSessionStore((state) => state.clearSession);
  const logout = useLogout();

  const currentLanguage: AppLanguage = isSupportedLanguage(i18n.language)
    ? i18n.language
    : DEFAULT_LANGUAGE;

  const handleLanguageChange = (language: AppLanguage) => {
    void i18n.changeLanguage(language);
  };

  const handleLogout = () => {
    logout.mutate(
      {},
      {
        onSettled: () => {
          clearSession();
          queryClient.clear();
        },
      }
    );
  };

  return (
    <Screen edges={SETTINGS_TAB_EDGES} contentProps={SETTINGS_CONTENT_PROPS}>
      <Typography variant="screenTitle">{t("settings.title")}</Typography>
      <YStack gap="$3">
        <Typography variant="cardTitle">{t("settings.language")}</Typography>
        <LanguageToggle
          value={currentLanguage}
          onChange={handleLanguageChange}
        />
      </YStack>
      <YStack gap="$3">
        <Typography variant="cardTitle">{t("settings.account")}</Typography>
        <Typography tone="secondary">{user?.phoneNumber ?? "—"}</Typography>
      </YStack>
      <YStack marginTop="auto" gap="$3">
        <Button
          title={t("settings.logout")}
          variant="danger"
          onPress={handleLogout}
          loading={logout.isPending}
          fullWidth
        />
        <Typography variant="small" tone="secondary" align="center">
          {t("settings.version", {
            version: Constants.expoConfig?.version ?? "0.0.0",
          })}
        </Typography>
      </YStack>
    </Screen>
  );
};
