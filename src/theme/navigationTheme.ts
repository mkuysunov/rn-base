import { DefaultTheme, type Theme } from "@react-navigation/native";

import { semanticColors } from "./colors";
import { fontFamily } from "./typography";

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: semanticColors.primary,
    background: semanticColors.background,
    card: semanticColors.surface,
    text: semanticColors.textPrimary,
    border: semanticColors.border,
    notification: semanticColors.danger,
  },
  fonts: {
    regular: { fontFamily: fontFamily.regular, fontWeight: "400" },
    medium: { fontFamily: fontFamily.medium, fontWeight: "500" },
    bold: { fontFamily: fontFamily.bold, fontWeight: "700" },
    heavy: { fontFamily: fontFamily.extraBold, fontWeight: "800" },
  },
};
