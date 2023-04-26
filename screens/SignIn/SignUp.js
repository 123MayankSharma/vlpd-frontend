import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import React, { useState } from "react";
import axios from "axios";

const SignUp = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isValid = (username, email, password) => {
    return (
      username.trim().length > 4 &&
      username.trim().length <= 40 &&
      password.trim().length > 6 &&
      password.trim().length <= 40 &&
      email.includes("@")
    );
  };

  const handlePress = async () => {
    const postBody = { username: username, email: email, password: password };
    if (isValid(username, email, password)) {
      try {
        setLoading(true);
        const data = await axios.post(`backend/register`, postBody);
        setLoading(false);
        Alert.alert("Success", "You have been Registered!", [
          {
            text: "Log In",
            onPress: () => {
              navigation.navigate("LogIn");
            },
          },
        ]);

        // navigation.navigate("LogIn");
      } catch (error) {
        setLoading(false);
        if (error.response) {
          const { Message } = error.response.data;
          Alert.alert("Error", Message, [
            {
              text: "Try Again",
              onPress: () => {
                navigation.navigate("SignUp");
              },
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
            "Could Not Register You! Please Try Again!",
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
    } else {
      Alert.alert(
        "Please Make Sure Username/Password/email are greater than 4 characters!"
      );
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
              textContentType="emailAddress"
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
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
              mode="contained"
              theme={{ colors: { primary: "teal" } }}
              onPress={handlePress}
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

export default SignUp;
