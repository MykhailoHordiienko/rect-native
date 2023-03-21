import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ImageBackground,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { useState } from "react";

export default function App() {
  const [isKeyboard, setIsKeyboard] = useState(false);

  const handleKeyboard = () => {
    setIsKeyboard(true);
  };

  const hideKeyboard = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgimg}
          source={require("./assets/images/Photo-BG.jpg")}>
          {/* <RegistrationScreen
            isKeyboard={isKeyboard}
            handleKeyboard={handleKeyboard}
            hideKeyboard={hideKeyboard}
          /> */}
          <LoginScreen
            isKeyboard={isKeyboard}
            handleKeyboard={handleKeyboard}
            hideKeyboard={hideKeyboard}
          />
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
