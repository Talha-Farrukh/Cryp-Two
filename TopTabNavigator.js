import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Platform } from "react-native";
import CoinListScreen from "./Screens/CoinListScreen";
import ExperimentalScreen from "./Screens/ExperimentalScreen";
import TrendingCoinScreen from "./Screens/TrendingCoinScreen";

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
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
          backgroundColor: "hsl(220, 95%, 65%)",
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
        swipeEnabled: false,
      }}
    >
      <Tab.Screen name="Main Portfolio" component={CoinListScreen} />
      <Tab.Screen name="Trending" component={TrendingCoinScreen} />
      <Tab.Screen name="Search" component={ExperimentalScreen} />
    </Tab.Navigator>
  );
}
