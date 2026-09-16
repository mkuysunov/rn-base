import "dayjs/locale/en";
import "dayjs/locale/ru";

import dayjs from "dayjs";
import { type PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const DayjsProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const { i18n } = useTranslation();

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  return children;
};
