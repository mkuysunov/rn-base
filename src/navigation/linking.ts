import type { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import type { RootStackParamList } from "./navigationTypes";
import { ROUTES } from "./routes";

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      [ROUTES.AUTH]: {
        screens: {
          [ROUTES.LOGIN]: "login",
        },
      },
      [ROUTES.MAIN]: {
        screens: {
          [ROUTES.HOME]: "home",
          [ROUTES.SETTINGS]: "settings",
        },
      },
    },
  },
};
