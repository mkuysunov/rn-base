export const fontFamily = {
  regular: "Onest-Regular",
  medium: "Onest-Medium",
  semiBold: "Onest-SemiBold",
  bold: "Onest-Bold",
  extraBold: "Onest-ExtraBold",
} as const;

export const fontWeights = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
} as const;

export const fontSizes = {
  small: 14,
  body: 16,
  cardTitle: 17,
  lead: 20,
  section: 24,
  screenTitle: 30,
} as const;

export const lineHeights = {
  small: 20,
  body: 26,
  cardTitle: 22,
  lead: 32,
  section: 30,
  screenTitle: 36,
} as const;

export type FontSizeToken = keyof typeof fontSizes;
