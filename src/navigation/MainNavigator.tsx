import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import { HomeScreen } from "@/screens/HomeScreen";
import { SettingsScreen } from "@/screens/SettingsScreen";

import type { MainTabParamList } from "./navigationTypes";
import { MAIN_TAB_OPTIONS } from "./navigatorOptions";
import { ROUTES } from "./routes";
import { renderHomeTabIcon, renderSettingsTabIcon } from "./tabBarIcons";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={MAIN_TAB_OPTIONS}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: t("tabs.home"), tabBarIcon: renderHomeTabIcon }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          title: t("tabs.settings"),
          tabBarIcon: renderSettingsTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};
