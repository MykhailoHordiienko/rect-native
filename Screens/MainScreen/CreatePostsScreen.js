import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { MapPinSvg } from "../../Utils/SvgComponents";

export const CreatePostsScreen = ({ navigation }) => {
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const getPermission = async () => {
    await requestPermission();
  };

  useEffect(() => {
    if (!permission) {
      getPermission();
    }
  }, []);

  const takePhoto = async () => {
    const result = await snap.takePictureAsync();
    setPhoto(result.uri);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const sendPhoto = () => {
    navigation.navigate("Posts", { photo });
  };
  return (
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
          style={styles.nameInput}
          placeholder="Name It"
        />
      </View>
      <View>
        <MapPinSvg style={styles.mapPin} />
        <TextInput
          style={styles.geoInput}
          placeholder="Location"></TextInput>
      </View>
      <TouchableOpacity
        onPress={sendPhoto}
        disabled={photo ? false : true}
        style={{
          ...styles.publishBtn,
          backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
        }}
        activeOpacity={0.6}>
        <Text
          style={{
            ...styles.publishBtnText,
            color: photo ? "#ffffff" : "#BDBDBD",
          }}>
          Publish
        </Text>
      </TouchableOpacity>
    </View>
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
    top: 303,
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
