import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useCallback } from "react";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const AuthStack = createStackNavigator();

export default function App() {
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
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
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
