import { defaultConfig } from "@tamagui/config/v5";
import { animations } from "@tamagui/config/v5-rn";
import { createFont, createTamagui, createTokens } from "tamagui";

import { colors, semanticColors } from "./colors";
import { radius } from "./radius";
import { layout, spacing } from "./spacing";
import { fontSizes, lineHeights } from "./typography";

const scale = {
  0: 0,
  0.5: 2,
  1: spacing.xxs,
  2: spacing.xs,
  3: spacing.sm,
  4: spacing.md,
  5: spacing.lg,
  6: spacing.xl,
  8: spacing["2xl"],
  10: spacing["3xl"],
  12: spacing["4xl"],
  16: spacing["5xl"],
  20: spacing["6xl"],
  28: spacing["7xl"],
} as const;

const negativeScale = Object.fromEntries(
  Object.entries(scale)
    .filter(([key]) => key !== "0")
    .map(([key, value]) => [`-${key}`, -value])
) as { [K in keyof typeof scale as `-${K}`]: number };

export const tokens = createTokens({
  color: colors,
  space: {
    ...scale,
    ...negativeScale,
    true: spacing.md,
  },
  size: {
    ...scale,
    true: layout.touchMin,
    touch: layout.touchMin,
    tabBar: layout.tabBarHeight,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: radius.field,
    true: radius.field,
    ...radius,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
});

const onestFont = createFont({
  family: "Onest",
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: fontSizes.small,
    5: fontSizes.body,
    6: fontSizes.cardTitle,
    7: fontSizes.lead,
    8: fontSizes.section,
    9: fontSizes.screenTitle,
    10: 36,
    11: 44,
    12: 52,
    true: fontSizes.body,
    ...fontSizes,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 18,
    4: lineHeights.small,
    5: lineHeights.body,
    6: lineHeights.cardTitle,
    7: lineHeights.lead,
    8: lineHeights.section,
    9: lineHeights.screenTitle,
    10: 42,
    11: 50,
    12: 58,
    true: lineHeights.body,
    ...lineHeights,
  },
  weight: {
    1: "400",
    true: "400",
  },
  letterSpacing: {
    1: 0,
    true: 0,
  },
  face: {
    400: { normal: "Onest-Regular" },
    500: { normal: "Onest-Medium" },
    600: { normal: "Onest-SemiBold" },
    700: { normal: "Onest-Bold" },
    800: { normal: "Onest-ExtraBold" },
  },
});

const lightTheme = {
  background: semanticColors.background,
  backgroundHover: colors.violet100,
  backgroundPress: colors.violet100,
  backgroundFocus: colors.violet100,
  color: semanticColors.textPrimary,
  colorHover: semanticColors.textPrimary,
  colorPress: semanticColors.textPrimary,
  colorFocus: semanticColors.textPrimary,
  colorTransparent: "rgba(46, 42, 77, 0)",
  borderColor: semanticColors.border,
  borderColorHover: colors.violet400,
  borderColorPress: colors.violet500,
  borderColorFocus: colors.violet500,
  placeholderColor: semanticColors.textSecondary,
  outlineColor: semanticColors.focusRing,
  shadowColor: "rgba(46, 42, 77, 0.24)",
  accentBackground: semanticColors.primary,
  accentColor: colors.white,
  surface: semanticColors.surface,
  chrome: semanticColors.chrome,
  primary: semanticColors.primary,
  primaryStrong: semanticColors.primaryStrong,
  cta: semanticColors.cta,
  accentSoft: semanticColors.accentSoft,
  textPrimary: semanticColors.textPrimary,
  textSecondary: semanticColors.textSecondary,
  textInverse: semanticColors.textInverse,
  border: semanticColors.border,
  danger: semanticColors.danger,
  dangerSoft: "rgba(164, 46, 67, 0.08)",
  rating: semanticColors.rating,
};

const themes = {
  light: lightTheme,
  light_accent: {
    ...lightTheme,
    background: colors.violet500,
    backgroundHover: colors.violet400,
    backgroundPress: colors.violet800,
    backgroundFocus: colors.violet400,
    color: colors.white,
    colorHover: colors.white,
    colorPress: colors.white,
    colorFocus: colors.white,
    borderColor: colors.violet500,
  },
  light_danger: {
    ...lightTheme,
    background: colors.danger600,
    backgroundHover: colors.danger600,
    backgroundPress: colors.danger600,
    backgroundFocus: colors.danger600,
    color: colors.white,
    colorHover: colors.white,
    colorPress: colors.white,
    colorFocus: colors.white,
    borderColor: colors.danger600,
  },
};

export const tamaguiConfig = createTamagui({
  tokens,
  themes,
  fonts: {
    body: onestFont,
    heading: onestFont,
  },
  animations,
  media: defaultConfig.media,
  shorthands: defaultConfig.shorthands,
  selectionStyles: defaultConfig.selectionStyles,
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
});

export type AppTamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}
