import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { YStack } from "tamagui";

import { useGetMe } from "@/services/auth/useAuth";
import { selectUser, useSessionStore } from "@/store/sessionStore";
import { InfoBanner } from "@/ui-kit/InfoBanner";
import { Screen } from "@/ui-kit/Screen";
import { Typography } from "@/ui-kit/Typography";
import { formatDate } from "@/utils/formatDate";
import { getErrorMessage } from "@/utils/getErrorMessage";

import {
  HOME_CONTENT_PROPS,
  HOME_TAB_EDGES,
  TODAY_ORDERS_PLACEHOLDER,
} from "./HomeScreenConstants";
import { HomeCard } from "./HomeScreenStyles";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const user = useSessionStore(selectUser);
  const setUser = useSessionStore((state) => state.setUser);
  const me = useGetMe();

  useEffect(() => {
    if (me.data) {
      setUser(me.data);
    }
  }, [me.data, setUser]);

  const displayName = me.data?.displayName ?? user?.displayName;

  return (
    <Screen scroll edges={HOME_TAB_EDGES} contentProps={HOME_CONTENT_PROPS}>
      <YStack gap="$1">
        <Typography variant="small" tone="secondary">
          {formatDate(new Date(), "dddd, D MMMM")}
        </Typography>
        <Typography variant="screenTitle">{t("home.title")}</Typography>
        <Typography variant="lead">
          {displayName
            ? t("home.greeting", { name: displayName })
            : t("home.greetingAnonymous")}
        </Typography>
      </YStack>
      {me.isError ? (
        <InfoBanner
          tone="danger"
          message={getErrorMessage(me.error, t("common.errors.generic"))}
        />
      ) : null}
      <HomeCard>
        <Typography variant="cardTitle">
          {t("home.todayCard", { count: TODAY_ORDERS_PLACEHOLDER })}
        </Typography>
        <Typography variant="small" tone="secondary">
          {t("home.scaffoldHint")}
        </Typography>
      </HomeCard>
    </Screen>
  );
};
