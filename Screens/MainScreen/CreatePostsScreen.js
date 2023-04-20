import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { MapPinSvg } from "../../Utils/SvgComponents";
import { storage, cloudFireStore } from "../../FireBase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export const CreatePostsScreen = ({ navigation }) => {
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [geo, setGeo] = useState("");
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { userId, nickName } = useSelector((state) => state.auth);

  const getPermission = async () => {
    await requestPermission();
    await Location.requestForegroundPermissionsAsync();
  };

  useEffect(() => {
    if (!permission) {
      getPermission();
    }
  }, []);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNameIt = (e) => {
    setNameInput(e);
  };
  const handleGeo = (e) => {
    setGeo(e);
  };

  const takePhoto = async () => {
    const result = await snap.takePictureAsync();
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setPhoto(result.uri);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const sendPhoto = async () => {
    if (!photo || !geo || !nameInput) {
      return;
    }
    setGeo("");
    setNameInput("");
    setPhoto(null);
    setLocation(null);
    await uploadPostToServer();
    navigation.navigate("DefaultPostsScreen");
  };

  const uploadPhotoToFireStore = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const timeId = Date.now().toString();
    const path = `posts/${timeId}`;

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const photoUrl = await getDownloadURL(storageRef);
    return photoUrl;
  };

  const uploadPostToServer = async () => {
    const photoUrl = await uploadPhotoToFireStore();
    try {
      const docRef = await addDoc(collection(cloudFireStore, "userPosts"), {
        userId,
        nickName,
        photo: photoUrl,
        location,
        imgName: nameInput,
        geoName: geo,
      });
      //   console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <Camera
          type={type}
          style={styles.camera}
          ref={setSnap}>
          {photo && (
            <View style={styles.checkPhotoContainer}>
              <Image
                style={styles.checkPhoto}
                source={{ uri: photo }}
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.buttonAction}
            onPress={takePhoto}>
            <Image source={require("../../assets/images/camera-action.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonToggle}
            onPress={toggleCameraType}>
            <Image source={require("../../assets/images/camera-switch.png")} />
          </TouchableOpacity>
        </Camera>
        <Text style={styles.cameraText}>
          {photo ? "Change Photo" : "Take a Picture"}
        </Text>
        <View>
          <TextInput
            onSubmitEditing={sendPhoto}
            value={nameInput}
            onChangeText={handleNameIt}
            style={styles.nameInput}
            placeholder="Name It"
          />
        </View>
        <View>
          <MapPinSvg style={styles.mapPin} />
          <TextInput
            onSubmitEditing={sendPhoto}
            value={geo}
            onChangeText={handleGeo}
            style={styles.geoInput}
            placeholder="Location"></TextInput>
        </View>
        <TouchableOpacity
          onPress={sendPhoto}
          disabled={photo ? false : true}
          style={{
            ...styles.publishBtn,
            backgroundColor: photo && nameInput && geo ? "#FF6C00" : "#F6F6F6",
          }}
          activeOpacity={0.6}>
          <Text
            style={{
              ...styles.publishBtnText,
              color: photo && nameInput && geo ? "#ffffff" : "#BDBDBD",
            }}>
            Publish
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  camera: {
    marginTop: 32,
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkPhotoContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  checkPhoto: {
    height: 150,
    width: 150,
    borderRadius: 8,
  },
  buttonAction: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonToggle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 200,
    right: 8,
    borderRadius: 50,
  },
  cameraText: {
    fontFamily: "JetBrainsMono",
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  nameInput: {
    fontFamily: "JetBrainsMono",
    marginTop: 48,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
  },
  mapPin: {
    position: "absolute",
    bottom: 15,
  },
  geoInput: {
    fontFamily: "JetBrainsMono",
    marginTop: 32,
    paddingBottom: 15,
    paddingLeft: 28,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    color: "#212121",
  },
  publishBtn: {
    height: 50,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  publishBtnText: {
    fontFamily: "JetBrainsMono",
    fontSize: 16,
    lineHeight: 19,
  },
});
