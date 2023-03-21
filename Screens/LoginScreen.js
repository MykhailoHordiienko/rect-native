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

const LoginScreen = () => {
  return (
    // <View style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.form}>
        <View>
          <Text style={styles.formTitle}>Log In</Text>
        </View>
        <View style={styles.inputContainer}>
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
          style={styles.signInBtn}
          activeOpacity={0.6}>
          <Text style={styles.signInBtnText}>Sign In</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.loginLink}>Or Sign Up</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
    // </View>
  );
};

export default LoginScreen;

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
  formTitle: {
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
  signInBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  signInBtnText: {
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
