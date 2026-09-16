import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { selectIsAuthenticated, useSessionStore } from "@/store/sessionStore";

import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";
import type { RootStackParamList } from "./navigationTypes";
import { ROOT_STACK_OPTIONS } from "./navigatorOptions";
import { ROUTES } from "./routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useSessionStore(selectIsAuthenticated);

  return (
    <Stack.Navigator screenOptions={ROOT_STACK_OPTIONS}>
      {isAuthenticated ? (
        <Stack.Screen name={ROUTES.MAIN} component={MainNavigator} />
      ) : (
        <Stack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
