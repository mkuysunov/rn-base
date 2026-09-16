import { NavigationContainer } from "@react-navigation/native";
import type { PropsWithChildren } from "react";

import { linking } from "@/navigation/linking";
import { navigationTheme } from "@/theme/navigationTheme";

export const NavigationProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <NavigationContainer theme={navigationTheme} linking={linking}>
      {children}
    </NavigationContainer>
  );
};
