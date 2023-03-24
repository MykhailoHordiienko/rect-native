import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const MapScreen = ({ route: { params } }) => {
  //   console.log(params.dataLocation);
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
