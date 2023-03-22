import { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [formState, setFormState] = useState(initialState);
  const [isKeyboard, setIsKeyboard] = useState(false);

  const handleKeyboard = () => {
    setIsKeyboard(true);
  };

  const hideKeyboard = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleEmail = (e) => {
    setFormState((prev) => ({ ...prev, email: e }));
  };
  const handlePassword = (e) => {
    setFormState((prev) => ({ ...prev, password: e }));
  };

  const onSubmit = () => {
    console.log("email ---", formState.email);
    console.log("password ---", formState.password);
    setFormState(initialState);
    hideKeyboard();
  };

  const navigateRegistration = () => {
    navigation.navigate("Registration");
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ImageBackground
        style={styles.bgimg}
        source={require("../../assets/images/Photo-BG.jpg")}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{ ...styles.form, marginBottom: isKeyboard ? -250 : 0 }}>
            <View>
              <Text style={styles.formTitle}>Log In</Text>
            </View>
            <View style={styles.inputContainer}>
              <View>
                <TextInput
                  inputMode="email"
                  value={formState.email}
                  onChangeText={(e) => handleEmail(e)}
                  onSubmitEditing={onSubmit}
                  onFocus={handleKeyboard}
                  style={styles.input}
                  placeholder="Email"
                />
              </View>
              <View>
                <TextInput
                  value={formState.password}
                  onChangeText={(e) => {
                    handlePassword(e);
                  }}
                  onSubmitEditing={onSubmit}
                  onFocus={handleKeyboard}
                  style={styles.input}
                  secureTextEntry={showPassword ? true : false}
                  placeholder="Password"
                />
                <TouchableOpacity
                  style={styles.showBtn}
                  onPress={togglePassword}>
                  <Text style={styles.showBtnText}>Show</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={onSubmit}
              style={styles.signInBtn}
              activeOpacity={0.6}>
              <Text style={styles.signInBtnText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateRegistration}>
              <Text style={styles.loginLink}>Or Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bgimg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    backgroundColor: "#ffffff",
    marginTop: "auto",
    width: "100%",
    paddingBottom: 144,
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  formTitle: {
    fontFamily: "JetBrainsMono",

    marginTop: 32,
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
  },
  inputContainer: {
    gap: 16,
    marginTop: 33,
    marginBottom: 43,
  },
  input: {
    fontFamily: "JetBrainsMono",

    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    paddingLeft: 16,
  },
  showBtn: {
    position: "absolute",
    height: 20,
    top: "50%",
    right: 0,
    marginRight: 16,
    transform: [{ translateY: -10 }],
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  showBtnText: {
    fontFamily: "JetBrainsMono",
  },
  signInBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  signInBtnText: {
    fontFamily: "JetBrainsMono",

    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  loginLink: {
    fontFamily: "JetBrainsMono",
    marginTop: 16,
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
