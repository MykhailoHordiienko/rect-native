import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Dimensions } from "react-native";
import { SendMessageSvg } from "../../Utils/SvgComponents";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  getDocs,
  getCountFromServer,
  doc,
  updateDoc,
} from "firebase/firestore";
import { cloudFireStore } from "../../FireBase/config";
import uuid from "react-native-uuid";

const width = Dimensions.get("window").width;

export const CommentsScreen = ({ route: { params } }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(null);
  const [isKeyboard, setIsKeyboard] = useState(false);

  const nickName = useSelector((state) => state.auth.nickName);

  const { docId, photo } = params.item;

  const handleKeyboard = () => {
    setIsKeyboard(true);
  };

  const hideKeyboard = () => {
    setIsKeyboard(false);
    Keyboard.dismiss();
  };

  const getAllComments = async () => {
    let resData = [];

    const querySnapshot = await getDocs(
      collection(cloudFireStore, "userPosts", docId, "comments")
    );
    querySnapshot.forEach((doc) => {
      resData = [...resData, { ...doc.data() }];
    });

    const sortedResData = [...resData].sort((a, b) => {
      return a.date - b.date;
    });

    setAllComments(sortedResData);
  };

  const createComment = async () => {
    const collectionRef = await collection(
      cloudFireStore,
      "userPosts",
      docId,
      "comments"
    );
    await addDoc(collectionRef, {
      nickName,
      comment,
      id: uuid.v4(),
      date: Date.now(),
    });
    const count = await getCountFromServer(
      collection(cloudFireStore, "userPosts", docId, "comments")
    );
    const postRef = await doc(cloudFireStore, "userPosts", docId);
    await updateDoc(postRef, { commentsCount: count.data().count });
    setComment("");
    hideKeyboard();
    getAllComments();
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ ...styles.container }}>
        <TouchableOpacity
          onPress={hideKeyboard}
          activeOpacity={1}
          style={styles.postContainer}>
          <Image
            style={styles.postImg}
            source={{ uri: photo }}
          />
        </TouchableOpacity>
        <SafeAreaView>
          <FlatList
            ListEmptyComponent={
              <Image source={require("../../assets/images/noComments.jpg")} />
            }
            style={{ marginBottom: 290 }}
            data={allComments}
            renderItem={({ item, index }) => (
              <View style={styles.commentView}>
                <View
                  style={{
                    ...styles.commentWrapper,
                    marginLeft: index % 2 !== 0 ? "auto" : 0,
                  }}>
                  <Text style={styles.comment}>{item.comment}</Text>
                  <Text
                    style={{
                      ...styles.date,
                      marginLeft: index % 2 !== 0 ? "auto" : 0,
                    }}>
                    {new Date(item.date).toLocaleString()}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>

        <View style={styles.inputWrapper}>
          <TextInput
            value={comment}
            onFocus={handleKeyboard}
            onSubmitEditing={createComment}
            onChangeText={(e) => setComment(e)}
            style={styles.input}
            inputMode="text"
            maxLength={200}
            multiline
            placeholder="Comment..."
          />
          <TouchableOpacity
            onPress={createComment}
            style={styles.sendBtn}
            activeOpacity={0.6}>
            <SendMessageSvg />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingBottom: 100,
    backgroundColor: "#fff",
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
  commentView: {
    marginTop: 32,
  },
  commentWrapper: {
    width: 300,
    marginBottom: 24,
    backgroundColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#E8E8E8",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  comment: {
    fontFamily: "JetBrainsMono",
  },
  date: {
    fontFamily: "JetBrainsMono",
    marginTop: 8,
    fontSize: 10,
    color: "#BDBDBD",
  },
  input: {
    fontFamily: "JetBrainsMono",
    backgroundColor: "#F6F6F6",

    minHeight: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    paddingLeft: 18,
    paddingRight: 48,
    paddingBottom: 16,
    paddingTop: 16,
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
