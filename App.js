import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Upload from "./screens/Upload";
import Info from "./screens/Info";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignIn/SignUp";
import AuthContext from "./AuthContext/AuthContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";

const defaultValue = async (val) => {
  const sessionString = await getItemAsync("user_session");
  const session = JSON.parse(sessionString);
  if (session && session.name && session.role) {
    if (val === "user") {
      return session.name;
    } else {
      return session.role;
    }
  }
  return "";
};

function App() {
  const [firstRoute, setFirstRoute] = useState("");
  const Stack = createNativeStackNavigator();

  const isLoggedIn = async () => {
    const sessionString = await getItemAsync("user_session");
    if (sessionString) {
      return "Home";
    } else {
      return "LogIn";
    }
  };

  useEffect(() => {
    isLoggedIn().then((data) => {
      setFirstRoute(data);
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName={firstRoute}>
      <Stack.Screen
        name="LogIn"
        component={SignIn}
        options={{ title: "Log In" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "Sign Up" }}
      />

      <Stack.Screen name="Home" component={Home} options={{ title: "VLPD" }} />
      <Stack.Screen
        name="Upload"
        component={Upload}
        options={{ title: "Upload Image" }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{ title: "Owner Info" }}
      />
    </Stack.Navigator>
  );
}
const containerTheme = {
  dark: true,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(0, 0, 0)",
    card: "rgb(2, 127, 128)",
    text: "rgb(252, 254, 255)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

export default () => {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  defaultValue("user").then((data) => setUser(data));
  defaultValue("role").then((data) => setRole(data));
  return (
    <AuthContext.Provider value={{ user, setUser, role, setRole }}>
      <NavigationContainer theme={containerTheme}>
        <App />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: Constants.statusBarHeight,
//   },
// });
//
