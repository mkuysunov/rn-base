export const colors = {
  violet950: "#2E2A4D",
  violet800: "#4A3F87",
  violet500: "#867CB9",
  violet400: "#9488C6",
  violet100: "#EEE8FF",
  violet50: "#F5F2FF",
  ink900: "#1A1512",
  ink500: "#6B6B72",
  gray200: "#E6E6EA",
  cream: "#FFFEFC",
  white: "#FFFFFF",
  danger600: "#A42E43",
  gold500: "#E8A93A",
} as const;

export const semanticColors = {
  background: colors.violet50,
  surface: colors.white,
  chrome: colors.violet950,
  primary: colors.violet500,
  primaryStrong: colors.violet800,
  cta: colors.violet400,
  accentSoft: colors.violet100,
  textPrimary: colors.violet950,
  textSecondary: colors.ink500,
  textInverse: colors.white,
  border: colors.gray200,
  danger: colors.danger600,
  rating: colors.gold500,
  focusRing: "rgba(148, 136, 198, 0.35)",
} as const;

export type ColorToken = keyof typeof colors;
export type SemanticColorToken = keyof typeof semanticColors;
