import { styled, Text } from "tamagui";

export const Typography = styled(Text, {
  name: "Typography",
  fontFamily: "$body",
  color: "$textPrimary",
  variants: {
    variant: {
      screenTitle: {
        fontSize: "$screenTitle",
        lineHeight: "$screenTitle",
        fontWeight: "800",
      },
      section: {
        fontSize: "$section",
        lineHeight: "$section",
        fontWeight: "700",
      },
      cardTitle: {
        fontSize: "$cardTitle",
        lineHeight: "$cardTitle",
        fontWeight: "600",
      },
      lead: {
        fontSize: "$lead",
        lineHeight: "$lead",
        fontWeight: "400",
      },
      body: {
        fontSize: "$body",
        lineHeight: "$body",
        fontWeight: "400",
      },
      bodyMedium: {
        fontSize: "$body",
        lineHeight: "$body",
        fontWeight: "500",
      },
      small: {
        fontSize: "$small",
        lineHeight: "$small",
        fontWeight: "400",
      },
      button: {
        fontSize: "$body",
        lineHeight: 20,
        fontWeight: "600",
      },
    },
    tone: {
      primary: { color: "$textPrimary" },
      secondary: { color: "$textSecondary" },
      inverse: { color: "$textInverse" },
      accent: { color: "$primaryStrong" },
      danger: { color: "$danger" },
    },
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
    },
  } as const,
  defaultVariants: {
    variant: "body",
    tone: "primary",
    align: "left",
  },
});
