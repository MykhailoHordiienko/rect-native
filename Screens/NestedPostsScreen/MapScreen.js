import { StyleSheet, View, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route: { params } }) => {
  const {
    geoName,
    imgName,
    location: { latitude: lat, longitude: long },
    photo,
  } = params.dataLocation;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        mapType="standard"
        minZoomLevel={0}>
        <Marker
          title={geoName}
          coordinate={{ latitude: lat, longitude: long }}
          description={imgName}>
          <Image
            style={styles.markerImg}
            source={{ uri: photo }}
          />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
