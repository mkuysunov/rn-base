import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { colors, semanticColors } from "@/theme/colors";
import { shadows } from "@/theme/shadows";
import { spacing } from "@/theme/spacing";
import { fontFamily } from "@/theme/typography";

export const ROOT_STACK_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "fade",
};

export const AUTH_STACK_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: semanticColors.background },
};

export const MAIN_TAB_OPTIONS: BottomTabNavigationOptions = {
  headerShown: false,
  sceneStyle: { backgroundColor: semanticColors.background },
  tabBarActiveTintColor: colors.white,
  tabBarInactiveTintColor: colors.violet400,
  tabBarStyle: {
    backgroundColor: semanticColors.chrome,
    borderTopWidth: 0,
    paddingTop: spacing.xs,
    boxShadow: shadows.floating,
  },
  tabBarLabelStyle: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
};
