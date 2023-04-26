import React, { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../AuthContext/AuthContext";
import Admin from "./components/Admin";
import User from "./components/User";

const Info = ({ route, navigation }) => {
  //we have received these params from the Home component as of now
  const { role } = useContext(AuthContext);
  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };
  return (
    <>
      {role !== "User" ? (
        <Admin {...route.params.info} />
      ) : (
        <User {...route.params.info} />
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 30,
        }}
      >
        <Button
          onPress={() => {
            navigation.navigate("Home");
          }}
          icon="home"
          mode="contained"
          theme={{ colors: { primary: "teal" } }}
        >
          Home
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  profileCard: {
    color: "white",
    marginTop: 30,
    marginLeft: 0,
    marginRight: 10,
    marginBottom: -10,
    width: "100%",
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: "row",
    backgroundColor: "#2f333e",
    padding: 8,
  },
  profileInfo: {
    color: "white",
    fontSize: 18,
    marginLeft: 3,
  },
});

export default Info;
