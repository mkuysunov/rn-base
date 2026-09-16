import { Input, styled } from "tamagui";

export const FieldInput = styled(Input, {
  name: "FieldInput",
  unstyled: true,
  fontFamily: "$body",
  fontSize: "$body",
  color: "$textPrimary",
  placeholderTextColor: "$textSecondary",
  backgroundColor: "$surface",
  borderWidth: 1,
  borderColor: "$border",
  borderRadius: "$field",
  minHeight: "$touch",
  paddingHorizontal: "$4",
  paddingVertical: "$3",
  focusStyle: {
    borderColor: "$primary",
  },
  variants: {
    invalid: {
      true: { borderColor: "$danger" },
    },
  } as const,
});
