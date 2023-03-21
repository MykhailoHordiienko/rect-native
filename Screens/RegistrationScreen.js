import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import AvatarAddSvg from "../Utils/AvatarAddSvg";

const RegistrationScreen = () => {
  return (
    // <View style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.form}>
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
              style={styles.input}
              placeholder="Login"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
            />
            <TouchableOpacity style={styles.showBtn}>
              <Text>Show</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.signUpBtn}
          activeOpacity={0.6}>
          <Text style={styles.signUpBtnText}>Sign Up</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.loginLink}>All ready have account? Sign In</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
    // </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 5,
    // borderColor: "red",
  },
  form: {
    backgroundColor: "#ffffff",
    marginTop: "auto",
    width: "100%",
    height: 549,
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
  signUpBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  signUpBtnText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  loginLink: {
    marginTop: 16,
    textAlign: "center",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
