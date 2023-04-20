import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CommentSvg, MapPinSvg } from "../../Utils/SvgComponents";
import { collection, getDocs } from "firebase/firestore";
import { cloudFireStore } from "../../FireBase/config";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const nickName = useSelector((state) => state.auth.nickName);
  const isFocused = useIsFocused();

  const getAllPosts = async () => {
    let resData = [];

    const querySnapshot = await getDocs(
      collection(cloudFireStore, "userPosts")
    );
    querySnapshot.forEach((doc) => {
      resData = [...resData, { ...doc.data(), docId: doc.id }];
    });

    setPosts([...resData]);
  };

  useEffect(() => {
    getAllPosts();
  }, [isFocused]);

  const handleMap = (dataLocation) => {
    navigation.navigate("Map", { dataLocation });
  };
  const handleComments = (item) => {
    navigation.navigate("Comments", { item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../../assets/images/user-photo.jpg")}
          style={styles.userAvatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{nickName}</Text>
          {/* <Text style={styles.userEmail}>email@example.com</Text> */}
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
              <View>
                <Text style={styles.imgName}>{item.imgName}</Text>
              </View>
              <View style={styles.imgInfoContainer}>
                <TouchableOpacity onPress={() => handleComments(item)}>
                  <View style={styles.commentContainer}>
                    <CommentSvg />
                    <Text style={styles.commentCount}>
                      {item.commentsCount}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.geoContainer}>
                  <MapPinSvg />
                  <TouchableOpacity onPress={() => handleMap(item)}>
                    <Text style={styles.geoText}>{item.geoName}</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    paddingBottom: 100,
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
    borderRadius: 8,
  },
  imgName: {
    marginTop: 8,
    fontFamily: "JetBrainsMono",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },
  commentCount: {
    fontFamily: "JetBrainsMono",
    fontSize: 16,
    lineHeight: 19,
  },
  imgInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 11,
  },
  geoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  geoText: {
    fontFamily: "JetBrainsMono",
    textDecorationLine: "underline",
  },
});
