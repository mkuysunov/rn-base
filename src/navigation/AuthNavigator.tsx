import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "@/screens/LoginScreen";

import type { AuthStackParamList } from "./navigationTypes";
import { AUTH_STACK_OPTIONS } from "./navigatorOptions";
import { ROUTES } from "./routes";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={AUTH_STACK_OPTIONS}>
    <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);
