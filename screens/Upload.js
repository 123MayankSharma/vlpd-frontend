import {
  View,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import axios from "axios";
import { useState } from "react";
import { getItemAsync } from "expo-secure-store";
const Info = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [imageInfo, setImageInfo] = useState({});
  const [loading, setIsLoading] = useState(false);
  const selectImageFromGallery = async () => {
    //ask for permission to access library

    if (photo == true) {
      uploadImage();
    }
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted == true) {
      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.6,
      });

      if (!res.cancelled) {
        // console.log(res)
        let image = {
          uri: res.uri,
          type: "image/jpg",
          name: `test.${res.uri.split(".")[1]}`,
        };
        setImageInfo(image);
        setModal(false);
        setPhoto(true);
      }
    } else {
      Alert.alert("Gallery Permission Required!");
    }
  };

  //function for using camera
  const selectImageFromCamera = async () => {
    //ask for permission to access library

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted == true) {
      let res = await ImagePicker.launchCameraAsync();
      if (!res.cancelled) {
        // console.log(res)
        let image = {
          uri: res.uri,
          type: "image/jpeg/jpg",
          name: `test.${res.uri.split(".")[1]}`,
        };
        setImageInfo(image);
        setModal(false);
        setPhoto(true);
      }
    } else {
      Alert.alert("Camera Permission Required!");
    }
  };

  //function for handling image uploads to backend
  const uploadImage = async () => {
    const formData = new FormData();
    const imgUri = imageInfo.uri;
    let uriParts = imgUri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    // console.log(fileType)
    setIsLoading(true);
    formData.append("image", {
      uri: imgUri,
      name: `${Date.now()}.${fileType}`,
      type: `image/${fileType}`,
    });
    const sessionString = await getItemAsync("user_session");
    const session = JSON.parse(sessionString);
    formData.append("token", session.token);
    formData.append("role", session.role);
    axios
      .post("backend/owner_info", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setIsLoading(false);
        navigation.navigate("Info", { info: response.data });
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.response) {
          const { errorTitle, errorMessage } = error.response.data;
          Alert.alert(errorTitle, errorMessage, [
            {
              text: "Home",
              onPress: () => {
                navigation.navigate("Home");
              },
            },
          ]);
        } else if (error.request) {
          Alert.alert("Connection Error", "Could Not Connect to backend", [
            {
              text: "Home",
              onPress: () => {
                navigation.navigate("Home");
              },
            },
          ]);
        } else {
          Alert.alert(
            "Request Error:",
            "Could Not Send Image to Backend. Please Try Again!",
            [
              {
                text: "Home",
                onPress: () => {
                  navigation.navigate("Home");
                },
              },
            ]
          );
        }
      });
  };
  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={"teal"}
          style={[styles.loaderContainer, styles.loaderHorizontal]}
        />
      ) : (
        <View style={styles.root}>
          <View style={styles.ImageSections}>
            {imageInfo == {} ? (
              <Image
                style={styles.images}
                source={require("../assets/favicon.png")}
              />
            ) : (
              <Image
                style={styles.images}
                source={{
                  uri: `${imageInfo.uri}`,
                }}
              />
            )}
          </View>
          <Button
            icon={photo == false ? "upload" : "check"}
            mode="contained"
            theme={{ colors: { primary: "teal" } }}
            onPress={() => {
              photo == false ? setModal(true) : uploadImage();
            }}
            style={{
              marginTop: "70%",
              marginLeft: "20%",
              width: "60%",
              height: "10%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {photo == false ? "Click/Select Image" : "Upload Image"}
          </Button>
          <Button
            mode="contained"
            theme={{ colors: { primary: "teal" } }}
            onPress={() => {
              if (photo == true) {
                setPhoto(false);
                setImageInfo({});
                setModal(true);
              } else {
                navigation.navigate("Home");
              }
            }}
            style={{
              marginTop: "5%",
              marginLeft: "20%",
              width: "60%",
              height: "10%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {photo == false ? "Go Back" : "Re-Select Image"}
          </Button>
          <Provider>
            <Portal>
              <Modal
                visible={modal}
                onDismiss={() => {
                  setModal(false);
                }}
                contentContainerStyle={styles.ModalStyle}
              >
                <View>
                  <View style={styles.modalButton}>
                    <Button
                      icon="camera"
                      mode="contained"
                      style={{ flex: 1, marginRight: 5 }}
                      theme={{ colors: { primary: "teal" } }}
                      onPress={selectImageFromCamera}
                    >
                      camera
                    </Button>
                    <Button
                      icon="image"
                      mode="contained"
                      style={{ flex: 1 }}
                      theme={{ colors: { primary: "teal" } }}
                      onPress={selectImageFromGallery}
                    >
                      gallery
                    </Button>
                  </View>
                  <Button
                    icon="close"
                    mode="contained"
                    onPress={() => {
                      setModal(false);
                    }}
                    style={{ marginHorizontal: 20, marginVertical: 20 }}
                  >
                    Cancel
                  </Button>
                </View>
              </Modal>
            </Portal>
          </Provider>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000000",
    color: "#fff",
    margin: 8,
    justifyContent: "center",
    bottom: 150,
  },
  ImageSections: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 8,
    top: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  images: {
    width: 300,
    height: 300,
    borderColor: "#1c1c21",
    borderWidth: 4,
    marginHorizontal: 3,
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 100,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
  ModalStyle: {
    backgroundColor: "#1c1c21",
    marginTop: 200,
    marginBottom: -120,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default Info;
