import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LandingScreen = () => {
  //function to set landing screen value
  const setLandingValue = async () => {
    await AsyncStorage.setItem("landing", JSON.stringify(false)).catch((err) =>
      console.log(err)
    );
  };

  const navigation = useNavigation();
  const [loaded] = useFonts({
    Montserrat: require("../assets/Fonts/Montserrat-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/Logo.png")}
        style={styles.img}
        resizeMode="contain"
      />
      <Text style={styles.txt}>
        Track your{"\n"}Cryptocurrency{"\n"}portfolio in{"\n"}realtime
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.replace("Root");
          setLandingValue();
        }}
      >
        <Text>{"Create Portfolio".toUpperCase()}</Text>
        <Feather name="arrow-up-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  img: {
    height: "50%",
    width: "75%",
  },
  txt: {
    fontSize: Platform.OS === "android" ? 35 : 50,
    fontWeight: "100",
    lineHeight: Platform.OS === "android" ? 50 : 0,
    fontFamily: "Montserrat",
  },
});
