import { styled, View } from "tamagui";

export const ButtonFrame = styled(View, {
  name: "Button",
  role: "button",
  accessible: true,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-start",
  minHeight: "$touch",
  borderRadius: "$pill",
  cursor: "pointer",
  transition: "100ms",
  pressStyle: {
    scale: 0.97,
    opacity: 0.9,
  },
  variants: {
    variant: {
      primary: { backgroundColor: "$primary" },
      secondary: { backgroundColor: "$accentSoft" },
      danger: { backgroundColor: "$danger" },
      ghost: { backgroundColor: "transparent" },
    },
    size: {
      md: { paddingVertical: "$3", paddingHorizontal: "$5" },
      lg: { paddingVertical: "$4", paddingHorizontal: "$6" },
    },
    fullWidth: {
      true: { alignSelf: "stretch" },
    },
    disabled: {
      true: { opacity: 0.5, pointerEvents: "none" },
    },
  } as const,
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});
