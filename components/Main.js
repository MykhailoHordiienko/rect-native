import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../Screens/HomeScreen";
import { AuthScreen } from "../Screens/AuthScreen";
import { useDispatch, useSelector } from "react-redux";
import { authIsLoginChange } from "../Screens/Redux/Auth/authOperations";

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const dispatch = useDispatch();
  const isLogIn = useSelector((state) => state.auth.isLogInChange);

  useEffect(() => {
    dispatch(authIsLoginChange());
  }, []);

  const [fontsLoaded] = useFonts({
    JetBrainsMono: require("../assets/fonts/JetBrainsMono-VariableFont_wght.ttf"),
    JetBrainsMono700: require("../assets/fonts/JetBrainsMono-700.ttf"),
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
        {isLogIn ? <HomeScreen /> : <AuthScreen />}
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
