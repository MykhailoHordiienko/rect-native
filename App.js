import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useCallback } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { handleRouting } from "./router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = handleRouting(true);
  const [fontsLoaded] = useFonts({
    JetBrainsMono: require("./assets/fonts/JetBrainsMono-VariableFont_wght.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <View
        style={styles.container}
        onLayout={onLayoutRootView}>
        {routing}
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
