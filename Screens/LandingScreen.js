import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { darkColor, lightColor } from "../Colors";
import { CryptoState } from "../CryptoContext";

const LandingScreen = () => {
  //function to set landing screen value
  const setLandingValue = async () => {
    await AsyncStorage.setItem("landing", JSON.stringify(false)).catch((err) =>
      console.log(err)
    );
  };

  const { theme } = CryptoState();
  const navigation = useNavigation();
  const [loaded] = useFonts({
    Montserrat: require("../assets/Fonts/Montserrat-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "light" ? lightColor.background : darkColor.background,
        },
      ]}
    >
      <StatusBar
        backgroundColor={
          theme === "light" ? lightColor.background : darkColor.background
        }
        style={theme === "light" ? "dark" : "light"}
        animated
      />
      <Image
        source={require("../assets/img/Logo.png")}
        style={styles.img}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.txt,
          {
            color:
              theme === "light" ? lightColor.fontColor : darkColor.fontColor,
          },
        ]}
      >
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
        <Text
          style={{
            color:
              theme === "light" ? lightColor.fontColor : darkColor.fontColor,
          }}
        >
          {"Create Portfolio".toUpperCase()}
        </Text>
        <Feather
          name="arrow-up-right"
          size={24}
          color={theme === "light" ? lightColor.fontColor : darkColor.fontColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
