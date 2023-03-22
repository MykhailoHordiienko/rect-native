import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthScreen } from "./Screens/AuthScreen";
import { HomeScreen } from "./Screens/HomeScreen";

import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
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
        {isAuth ? (
          <HomeScreen setIsAuth={setIsAuth} />
        ) : (
          <AuthScreen setIsAuth={setIsAuth} />
        )}
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
