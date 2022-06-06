import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";
import CoinItem from "../Components/SearchItem";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const ExperimentalScreen = () => {
  const Navigation = useNavigation();
  const [coins, setCoins] = useState();
  const [search, setSearch] = useState();
  const { currency } = CryptoState();
  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <LinearGradient colors={["#236AF3", "#236AF3"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View>
          <Text
            style={{
              color: "#ffff",
              paddingVertical: 35,
              fontSize: Platform.OS === "android" ? 20 : 16,
              alignSelf: "center",
            }}
          ></Text>
        </View>

        <View
          style={{
            height: "100%",
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}
        >
          <Searchbar
            onChangeText={(value) => setSearch(value.toLowerCase())}
            style={{ borderRadius: 12 }}
            placeholder="Name or Symbol"
          />
          <ScrollView
            style={{
              height: "91%",
              backgroundColor: "white",
              paddingTop: 10,
              paddingBottom: 20,
              marginTop: 10,
            }}
            onScroll={() => Keyboard.dismiss()}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {coins && search ? (
              <View>
                {handleSearch().map((data, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        Navigation.navigate("CoinDetails", {
                          item: data,
                        })
                      }
                    >
                      <CoinItem
                        key={index}
                        style={styles.coinItems}
                        name={data.name}
                        image={data.image}
                        rank={data.market_cap_rank}
                        symbol={data.symbol}
                        price={data.current_price}
                        priceChange={data.price_change_24h}
                        priceChangePercent={data.price_change_percentage_24h}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <View></View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ExperimentalScreen;

const styles = StyleSheet.create({});
