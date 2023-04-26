import { Text, View, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, Avatar } from "react-native-paper";
import { useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";
import React from "react";
import { deleteItemAsync } from "expo-secure-store";

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const handleLogout = async () => {
    await deleteItemAsync("user_session");
    navigation.navigate("LogIn");
  };
  return (
    <>
      {/* <View style={{ color: "white", marginTop: "40" }}> */}
      <Card>
        <Card.Content style={{ backgroundColor: "#1b1b1d" }}>
          <Card.Title
            title="Vehicle Info App"
            titleStyle={{ color: "white", paddingLeft: 0 }}
            left={() => {
              return (
                <Avatar.Icon
                  size={50}
                  icon="camera"
                  style={{ marginRight: "12%" }}
                />
              );
            }}
          />
          <Paragraph
            style={{
              fontSize: 18,
              fontWeight: "normal",
              color: "white",
              marginBottom: "5%",
            }}
          >
            Welcome {user} !Click on the Button below to start Scanning the
            Vehicle Number Plate.
          </Paragraph>
          <Card.Actions>
            <Button
              icon="arrow-right-drop-circle"
              theme={{ colors: { primary: "teal" } }}
              mode="contained"
              onPress={() => navigation.navigate("Upload")}
              style={{ marginLeft: -3, marginRight: 2 }}
              // style={styles.buttonStyle}
            >
              Start Scanning
            </Button>
            <Button
              icon="arrow-left-drop-circle"
              theme={{ colors: { primary: "teal" } }}
              mode="contained"
              onPress={handleLogout}
              style={{ margin: 4 }}
              // style={styles.buttonStyle}
            >
              Logout
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "white",
  },
  buttonStyle: {
    marginTop: "40%",
    marginLeft: "20%",
    width: "60%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
