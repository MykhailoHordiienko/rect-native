import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgimg}
        source={require("./assets/images/Photo-BG.jpg")}>
        <RegistrationScreen />
        {/* <LoginScreen /> */}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgimg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
});
