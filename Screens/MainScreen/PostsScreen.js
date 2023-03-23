import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

export const PostsScreen = ({ route: { params } }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (params) {
      setPosts((prev) => [...prev, params]);
    }
  }, [params]);

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
      <View>
        <FlatList
          data={posts}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image
                style={styles.postImg}
                source={{ uri: item.photo }}
              />
            </View>
          )}
        />
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
    marginVertical: 32,
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
  postContainer: {
    marginHorizontal: 16,
    marginBottom: 34,
  },
  postImg: {
    height: 240,
    resizeMode: "cover",
  },
});
