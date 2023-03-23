import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export const PostsScreen = ({ route: { params } }) => {
  console.log(params.photo);
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../../assets/images/user-photo.jpg")}
          style={styles.userAvatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginTop: 32,
  },
  userAvatar: {
    borderRadius: 16,
  },
  userInfo: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: "JetBrainsMono700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "JetBrainsMono",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
