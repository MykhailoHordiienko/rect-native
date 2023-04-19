import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export const CommentsScreen = ({ route: { params } }) => {
  const { docId, photo } = params.item;
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Image
          style={styles.postImg}
          source={{ uri: photo }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  postContainer: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  postImg: {
    height: 240,
    borderRadius: 8,
  },
});
