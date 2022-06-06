import axios, { Axios } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CoinListItems from "../Components/CoinListItems";
import PortfolioHeader from "../Components/PortfolioHeader";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { darkColor, lightColor } from "../Colors";

const TrendingCoinScreen = () => {
  const [trendingCoins, setTrendingCoins] = useState();
  const { currency, theme } = CryptoState();

  const fetch = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };

  useEffect(() => {
    fetch();
  }, [currency]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "light"
              ? lightColor.headerBackground
              : darkColor.headerBackground,
        },
      ]}
    >
      <SafeAreaView>
        {/* <PortfolioHeader /> */}
        <View
          style={[
            styles.body,
            {
              backgroundColor:
                theme === "light"
                  ? lightColor.background
                  : darkColor.background,
            },
          ]}
        >
          <View style={styles.bodyTop}>
            <Text
              style={{
                fontSize: 18,
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              Trending
            </Text>
          </View>
          <View
            style={{
              height: "72%",
              backgroundColor:
                theme === "light"
                  ? lightColor.background
                  : darkColor.background,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={refresh}
              //     onRefresh={fetchCoins}
              //     colors={["#236AF3"]}
              //   />
              // }
            >
              <CoinListItems coins={trendingCoins} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TrendingCoinScreen;

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: "#ffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "20%",
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
