import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";
import { SendMessageSvg } from "../../Utils/SvgComponents";
import { useState } from "react";

const width = Dimensions.get("window").width;

export const CommentsScreen = ({ route: { params } }) => {
  const [comment, setComment] = useState("");
  const { docId, photo } = params.item;
  console.log(docId);
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Image
          style={styles.postImg}
          source={{ uri: photo }}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Comment..."
        />
        <TouchableOpacity
          style={styles.sendBtn}
          activeOpacity={0.6}>
          <SendMessageSvg />
        </TouchableOpacity>
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
  inputWrapper: {
    marginTop: "auto",
    marginHorizontal: 16,
    width: width - 32,
  },
  input: {
    fontFamily: "JetBrainsMono",
    backgroundColor: "#F6F6F6",

    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    paddingLeft: 16,
  },
  sendBtn: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: "50%",
  },
});
