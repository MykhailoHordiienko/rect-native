import { useState } from "react";
import {
  Image,
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
  Button,
} from "react-native";
import AvatarAddSvg from "../Utils/AvatarAddSvg";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
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
  const handleLogin = (e) => {
    setFormState((prev) => ({ ...prev, login: e }));
  };
  const handleEmail = (e) => {
    setFormState((prev) => ({ ...prev, email: e }));
  };
  const handlePassword = (e) => {
    setFormState((prev) => ({ ...prev, password: e }));
  };

  const onSubmit = () => {
    console.log("login ---", formState.login);
    console.log("email ---", formState.email);
    console.log("password ---", formState.password);
    setFormState(initialState);
    hideKeyboard();
  };

  const navigateLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ImageBackground
        style={styles.bgimg}
        source={require("../assets/images/Photo-BG.jpg")}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={{ ...styles.form, marginBottom: isKeyboard ? -180 : 0 }}>
            <View style={styles.avatar}>
              <Image style={styles.avatarImg} />
              <AvatarAddSvg style={styles.addAvatarBtn} />
            </View>
            <View>
              <Text style={styles.formTitle}>Register</Text>
            </View>
            <View style={styles.inputContainer}>
              <View>
                <TextInput
                  value={formState.login}
                  onChangeText={(e) => handleLogin(e)}
                  onSubmitEditing={onSubmit}
                  onFocus={handleKeyboard}
                  style={styles.input}
                  placeholder="Login"
                />
              </View>
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
              style={styles.signUpBtn}
              activeOpacity={0.6}>
              <Text style={styles.signUpBtnText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.loginLink}>
              <Text style={styles.loginText}>All ready have account?</Text>
              <Button
                title="Sign In"
                onPress={navigateLogin}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  bgimg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  form: {
    backgroundColor: "#ffffff",
    marginTop: "auto",
    paddingBottom: 78,
    width: "100%",
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  avatar: {
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    position: "absolute",
    top: -55,
    left: "50%",
    transform: [{ translateX: -50 }],
    borderRadius: 16,
  },
  addAvatarBtn: {
    position: "absolute",
    bottom: 20,
    right: -(25 / 2),
  },
  formTitle: {
    fontFamily: "JetBrainsMono",
    marginTop: 92,
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
  signUpBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  signUpBtnText: {
    fontFamily: "JetBrainsMono",

    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  loginLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  loginText: {
    fontFamily: "JetBrainsMono",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
