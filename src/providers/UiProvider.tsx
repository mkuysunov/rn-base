import type { PropsWithChildren } from "react";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "@/theme/tamaguiConfig";

export const UiProvider = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
};
