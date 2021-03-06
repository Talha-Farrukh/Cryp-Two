import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Platform } from "react-native";
import { darkColor, lightColor } from "./Colors";
import { CryptoState } from "./CryptoContext";
import CoinListScreen from "./Screens/CoinListScreen";
import CompareScreen from "./Screens/CompareScreen";
import ExperimentalScreen from "./Screens/ExperimentalScreen";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  const { theme } = CryptoState();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          top: Platform.OS === "ios" ? "7%" : "5%",
          zIndex: 999,
          width: "90%",
          alignSelf: "center",
          backgroundColor: "transparent",
        },
        tabBarIndicatorStyle: {
          backgroundColor:
            theme === "light"
              ? lightColor.tabBarIndicator
              : darkColor.tabBarIndicator,
          height: "80%",
          marginBottom: "1%",
          borderRadius: 20,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          color: "white",
          fontSize: 10,
          alignSelf: "center",
        },
      }}
    >
      <Tab.Screen name="Main Portfolio" component={CoinListScreen} />
      {/* <Tab.Screen name="Trending" component={TrendingCoinScreen} /> */}
      <Tab.Screen name="Compare" component={CompareScreen} />
      <Tab.Screen name="Search" component={ExperimentalScreen} />
    </Tab.Navigator>
  );
}
