import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { CryptoState } from "./CryptoContext";
import CoinDetailsScreen from "./Screens/CoinDetailsScreen";
import LandingScreen from "./Screens/LandingScreen";
import TabNavigator from "./TabNavigator";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const [landing, setLanding] = useState(true);

  const getingLanding = async () => {
    await AsyncStorage.getItem("landing")
      .then((v) => {
        console.log(v);
        if (v !== null) {
          setLanding(v === "false" ? false : true);
        } else {
          setLanding(true);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getingLanding();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Group>
        {landing && (
          <Stack.Screen
            name={"Landing"}
            component={LandingScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Stack.Screen
          name={"Root"}
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <Stack.Screen
          name={"CoinDetails"}
          component={CoinDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
