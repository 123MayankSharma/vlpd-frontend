import { StyleSheet, Text, View, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
const Admin = ({
  _id,
  name,
  email,
  vehicle_number_plate,
  phone,
  address,
  Date,
}) => {
  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else {
      Linking.openURL(`telprompt:${phone}`);
    }
  };

  return (
    <View style={styles.root}>
      {/* <Text style={{color:"white"}}>profil</Text> */}
      <LinearGradient colors={["gray", "teal"]} style={{ height: "20%" }} />
      <View style={{ alignItems: "center", marginTop: -40 }}>
        {/* <Image */}
        {/*   style={{ width: 120, height: 120, borderRadius: 60 }} */}
        {/*   source={{ */}
        {/*     uri: `${photo}`, */}
        {/*   }} */}
        {/* /> */}
        <Title style={{ color: "white", fontSize: 30 }}>{name}</Title>
        <Text style={{ color: "white", fontSize: 18, marginTop: -10 }}>{}</Text>
      </View>
      <Card
        style={styles.profileCard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={28} color="white" />
          <Text style={styles.profileInfo}>{email}</Text>
        </View>
      </Card>
      <Card style={styles.profileCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="date-range" size={28} color="white" />
          <Text style={styles.profileInfo}>{Date}</Text>
        </View>
      </Card>

      <Card style={styles.profileCard} onPress={openDial}>
        <View style={styles.cardContent}>
          <MaterialIcons name="phone-android" size={28} color="white" />
          <Text style={styles.profileInfo}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.profileCard}>
        <View style={styles.cardContent}>
          <MaterialIcons name="home" size={28} color="white" />
          <Text style={styles.profileInfo}>{address}</Text>
        </View>
      </Card>
      <Card style={styles.profileCard}>
        <View style={styles.cardContent}>
          <MaterialIcons
            name="format-list-numbered-rtl"
            size={28}
            color="white"
          />
          <Text style={styles.profileInfo}>{vehicle_number_plate}</Text>
        </View>
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 30,
        }}
      ></View>
    </View>
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

export default Admin;
