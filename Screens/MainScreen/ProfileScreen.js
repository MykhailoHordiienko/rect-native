import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CommentSvg, LogOutSvg, MapPinSvg } from "../../Utils/SvgComponents";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../Redux/Auth/authOperations";
import { useIsFocused } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { cloudFireStore } from "../../FireBase/config";
import { FlatList } from "react-native-gesture-handler";

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const nickName = useSelector((state) => state.auth.nickName);
  const userId = useSelector((state) => state.auth.userId);
  const isFocused = useIsFocused();
  const height = Dimensions.get("window").height;

  const getAllUserPosts = async () => {
    let resData = [];

    const q = query(
      collection(cloudFireStore, "userPosts"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resData = [...resData, { ...doc.data(), docId: doc.id }];
    });

    setPosts([...resData]);
  };

  useEffect(() => {
    getAllUserPosts();
  }, [isFocused]);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(authSignOutUser());
  };

  const handleMap = (dataLocation) => {
    navigation.navigate("Map", { dataLocation });
  };
  const handleComments = (item) => {
    navigation.navigate("Comments", { item });
  };

  return (
    <ImageBackground
      style={styles.bgimg}
      source={require("../../assets/images/Photo-BG.jpg")}>
      <View style={{ ...styles.wrapper, height: height - 300 }}>
        <View style={styles.avatar}>
          <Image />
        </View>
        <TouchableOpacity
          style={styles.logOut}
          onPress={handleLogOut}>
          <LogOutSvg />
        </TouchableOpacity>
        <View>
          <Text style={styles.nickName}>{nickName}</Text>
        </View>
        <View>
          <FlatList
            style={{ marginBottom: 110 }}
            data={posts}
            keyExtractor={(item) => item.photo}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgimg: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  wrapper: {
    backgroundColor: "#ffffff",
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
  logOut: {
    marginLeft: "auto",
    marginTop: 22,
  },
  nickName: {
    fontFamily: "JetBrainsMono",
    marginTop: 32,
    textAlign: "center",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
  },
  postContainer: {
    marginTop: 32,
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
