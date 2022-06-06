import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CoinListItems from "../Components/CoinListItems";
import CoinScrollListItems from "../Components/CoinScrollListItems";
import PortfolioHeader from "../Components/PortfolioHeader";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinListScreen = () => {
  const [coins, setCoins] = useState();
  const [refresh, setRefresh] = useState(false);
  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setRefresh(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setRefresh(false);
  };
  // const refreshCoins = () => {
  //   setCoins();
  //   fetchCoins();
  // };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const [loaded] = useFonts({
    Montserrat: require("../assets/Fonts/Montserrat-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#236AF3", "#1559E0"]} style={styles.container}>
      <StatusBar backgroundColor="#236AF3" style="light" animated />
      <SafeAreaView>
        <PortfolioHeader />
        <View style={styles.body}>
          <View style={styles.bodyTop}>
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Assets
            </Text>
            <TouchableOpacity
            // onPress={() => {
            //   refresh ? setRefresh(false) : setRefresh(true);
            // }}
            >
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ height: Platform.OS === "android" ? "33%" : "35%" }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={fetchCoins}
                  colors={["#236AF3"]}
                />
              }
            >
              <CoinListItems coins={coins} />
            </ScrollView>
          </View>
          {!coins ? (
            <></>
          ) : (
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                Recommend to Buy
              </Text>
              <View
                style={{
                  paddingVertical: 25,
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <CoinScrollListItems trendingcoins={coins} />
                </ScrollView>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CoinListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: "100%",
    backgroundColor: "#ffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bodyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "4%",
    paddingbottom: "2%",
    paddingHorizontal: "6%",
  },
});
