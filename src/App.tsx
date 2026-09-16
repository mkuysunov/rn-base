import "@/i18n/config";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "@/navigation/RootNavigator";
import { DayjsProvider } from "@/providers/DayjsProvider";
import { NavigationProvider } from "@/providers/NavigationProvider";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { UiProvider } from "@/providers/UiProvider";
import { FONT_ASSETS } from "@/theme/fonts";

void SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, fontsError] = useFonts(FONT_ASSETS);
  const isReady = fontsLoaded || fontsError !== null;

  useEffect(() => {
    if (isReady) {
      void SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <UiProvider>
        <ReactQueryProvider>
          <DayjsProvider>
            <NavigationProvider>
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationProvider>
          </DayjsProvider>
        </ReactQueryProvider>
      </UiProvider>
    </SafeAreaProvider>
  );
};

export default App;
