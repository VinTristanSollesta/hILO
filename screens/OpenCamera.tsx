import React, { useState, useRef } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "../Styles";

const OpenCamera = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const cameraRef = useRef<CameraView | null>(null);
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={Styles.button}>
          <Text style={Styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo: any = await cameraRef.current.takePictureAsync();
        setImageUri(photo.uri);
        setImages((prevImages) => [...prevImages, photo.uri]); // Update images state
      } catch (error) {
        console.error("Error taking picture: ", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Text style={styles.captureButtonText}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //@ts-ignore
            onPress={() => navigation.navigate("Library", { images })}
            style={styles.captureButton}
          >
            <Text style={styles.captureButtonText}>Go to Library</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: "#1E90FF", // Change the color as needed
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 5, // Add margin for spacing
  },
  captureButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default OpenCamera;
