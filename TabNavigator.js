import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CoinListScreen from "./Screens/CoinListScreen";
import SettingScreen from "./Screens/SettingScreen";
import { Foundation, Ionicons } from "@expo/vector-icons";
import TopTabNavigator from "./TopTabNavigator";
import { CryptoState } from "./CryptoContext";
import { darkColor, lightColor } from "./Colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = CryptoState();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor:
            theme === "light" ? lightColor.background : darkColor.background,
          borderTopColor: "transparent",
        },
        // tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Tab"
        component={TopTabNavigator}
        options={{
          headerShown: false,
          // tabBarIconStyle: {

          // },
          tabBarIcon: (tabInfo) => {
            return (
              <Foundation
                name="home"
                size={24}
                color={
                  theme === "light"
                    ? "rgba(29, 28, 28, 0.5)" && tabInfo.focused
                      ? lightColor.tabBarIndicator
                      : "rgba(29, 28, 28, 0.5)"
                    : "white" && tabInfo.focused
                    ? darkColor.fontColor
                    : darkColor.tabBarIndicator
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="settings"
                size={24}
                color={
                  theme === "light"
                    ? "rgba(29, 28, 28, 0.5)" && tabInfo.focused
                      ? lightColor.tabBarIndicator
                      : "rgba(29, 28, 28, 0.5)"
                    : "white" && tabInfo.focused
                    ? darkColor.fontColor
                    : darkColor.tabBarIndicator
                }
              />
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
