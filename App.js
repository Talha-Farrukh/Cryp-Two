import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform, SafeAreaView } from "react-native";
import CryptoContext from "./CryptoContext";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <CryptoContext>
      <NavigationContainer>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <StackNavigator />
        </View>
      </NavigationContainer>
    </CryptoContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
