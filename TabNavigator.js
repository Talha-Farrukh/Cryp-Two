import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CoinListScreen from "./Screens/CoinListScreen";
import SettingScreen from "./Screens/SettingScreen";
import { Foundation, Ionicons } from "@expo/vector-icons";
import TopTabNavigator from "./TopTabNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
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
                color={tabInfo.focused ? "#236AF3" : "rgba(29, 28, 28, 0.5)"}
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
                color={tabInfo.focused ? "#236AF3" : "rgba(29, 28, 28, 0.5)"}
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
