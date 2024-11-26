import React, { useState, useEffect, useRef } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "../Styles";
import { getColors, ImageColorsResult } from "react-native-image-colors";

const OpenCamera = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const navigation = useNavigation();
  const [colors, setColors] = useState<ImageColorsResult | null>(null);

  useEffect(() => {
    loadImage();
  }, []);

  useEffect(() => {
    if (imageUri) saveImage(imageUri);
  }, [imageUri]);

  const loadImage = async () => {
    try {
      const storedImage = await AsyncStorage.getItem("image");
      if (storedImage) {
        setImageUri(storedImage);
        console.log(storedImage);
      }
    } catch (error) {
      console.error("Failed to load image", error);
    }
  };

  const saveImage = async (uri: string) => {
    try {
      await AsyncStorage.setItem("image", uri);
    } catch (error) {
      console.error("Failed to save image", error);
    }
  };

  const saveColors = async (extractedColors: ImageColorsResult) => {
    try {
      await AsyncStorage.setItem("colors", JSON.stringify(extractedColors));
    } catch (error) {
      console.error("Failed to save colors", error);
    }
  };

  if (!permission) return <View />;

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
        const photo: any = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });
        setImageUri(photo.uri);
        console.log(photo.uri);
        extractColors(photo.uri); // Extract colors after taking the picture
      } catch (error) {
        console.error("Error taking picture: ", error);
      }
    }
  };

  const extractColors = async (uri: string) => {
    try {
      const result = await getColors(uri, {
        fallback: "#228B22",
        cache: true,
        key: uri,
      });
      setColors(result);
      await saveColors(result); // Save extracted colors to AsyncStorage
    } catch (error) {
      console.error("Error fetching colors: ", error);
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
            onPress={() => console.log("Image: ", imageUri)}
            style={styles.captureButton}
          >
            <Text style={styles.captureButtonText}>Extract Colors</Text>
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
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
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
