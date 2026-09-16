import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, styled, YStack } from "tamagui";

export const ScreenRoot = styled(SafeAreaView, {
  name: "ScreenRoot",
  flex: 1,
  variants: {
    background: {
      default: { backgroundColor: "$background" },
      surface: { backgroundColor: "$surface" },
    },
  } as const,
  defaultVariants: {
    background: "default",
  },
});

export const ScreenScroll = styled(ScrollView, {
  name: "ScreenScroll",
  flex: 1,
});

export const ScreenContent = styled(YStack, {
  name: "ScreenContent",
  flex: 1,
  variants: {
    padded: {
      true: { paddingHorizontal: "$4", paddingVertical: "$4" },
    },
  } as const,
});
