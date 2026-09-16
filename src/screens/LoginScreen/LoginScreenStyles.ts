import { KeyboardAvoidingView } from "react-native";
import { styled } from "tamagui";

export const LoginKeyboardView = styled(KeyboardAvoidingView, {
  name: "LoginKeyboardView",
  flex: 1,
  justifyContent: "center",
  gap: "$6",
});
