import { styled, View, XStack } from "tamagui";

export const LanguageToggleTrack = styled(XStack, {
  name: "LanguageToggleTrack",
  role: "radiogroup",
  alignSelf: "flex-start",
  padding: "$1",
  borderRadius: "$pill",
  backgroundColor: "$accentSoft",
});

export const LanguageToggleSegmentFrame = styled(View, {
  name: "LanguageToggleSegment",
  role: "radio",
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  borderRadius: "$pill",
  cursor: "pointer",
  transition: "100ms",
  pressStyle: {
    opacity: 0.8,
  },
  variants: {
    active: {
      true: { backgroundColor: "$surface" },
    },
  } as const,
});
