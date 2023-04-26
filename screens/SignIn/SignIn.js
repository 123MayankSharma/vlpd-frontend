import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState, useContext } from "react";
import AuthContext from "../../AuthContext/AuthContext";
import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
const SignIn = ({ navigation }) => {
  const { user, setUser, role, setRole } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePress = async () => {
    if (!username || !password) {
      Alert.alert("Please Enter Credentials to Log In!");
      return;
    }
    const postBody = { username: username, password: password };
    try {
      setLoading(true);
      const data = await axios.post(`backend/login`, postBody);

      try {
        const { name, role, token } = data.data;
        setUser(name);
        setRole(role);

        await SecureStore.setItemAsync(
          "user_session",
          JSON.stringify({
            name: name,
            role: role,
            token: token,
          })
        );
        const session = await SecureStore.getItemAsync("user_session");
        setLoading(false);
        Alert.alert("Success", "You have been Logged In!", [
          {
            text: "Ok",
            onPress: () => {
              navigation.navigate("Home");
            },
          },
        ]);
      } catch (err) {
        Alert.alert("Error Occured! Please try Again");
        return;
      }

      // navigation.navigate("LogIn");
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response) {
        const { Message } = error.response.data;
        Alert.alert("Error", Message, [
          {
            text: "Try Again",
          },
        ]);
      } else if (error.request) {
        Alert.alert("Connection Error", "Could Not Connect to backend", [
          {
            text: "Home",
            onPress: () => {
              navigation.navigate("LogIn");
            },
          },
        ]);
      } else {
        Alert.alert(
          "Request Error:",
          "Could Not Log You In! Please Try Again!",
          [
            {
              text: "Home",
              onPress: () => {
                navigation.navigate("LogIn");
              },
            },
          ]
        );
      }
    }
    // }
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
          <View>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 60,
              }}
            >
              VLPD
            </Text>
          </View>
          <KeyboardAvoidingView>
            <TextInput
              textContentType="username"
              label="Username"
              value={username}
              onChangeText={(text) => {
                setUserName(text);
              }}
              mode="flat"
              theme={{ colors: { primary: "teal", placeholder: "black" } }}
              style={styles.inputStyle}
              underlineColor="teal"
              outlineColor="#fff"
            />
            <TextInput
              secureTextEntry
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              mode="flat"
              theme={{ colors: { primary: "teal", placeholder: "black" } }}
              style={styles.inputStyle}
              underlineColor="teal"
              outlineColor="#fff"
            />
            <Button
              icon=""
              mode="contained"
              theme={{ colors: { primary: "teal" } }}
              style={styles.buttonStyle}
              onPress={handlePress}
            >
              Login
            </Button>

            <Button
              mode="contained"
              theme={{ colors: { primary: "teal" } }}
              style={styles.buttonStyle}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              Sign Up
            </Button>
          </KeyboardAvoidingView>
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
  },
  inputStyle: {
    margin: 3,
    backgroundColor: "#b6b6b6",
    color: "black",
  },
  buttonStyle: {
    margin: 2,
  },
});

export default SignIn;
