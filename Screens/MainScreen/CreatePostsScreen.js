import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";

export const CreatePostsScreen = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    marginTop: 32,
    marginHorizontal: 16,
    height: 343,
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
});
