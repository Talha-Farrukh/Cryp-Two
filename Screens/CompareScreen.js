import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkColor, lightColor } from "../Colors";
import CoinListItems from "../Components/CoinListItems";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import SelectDropdown from "react-native-select-dropdown";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import Compare from "../Components/Compare";

const CompareScreen = () => {
  const [trendingCoins, setTrendingCoins] = useState();
  const [selectedCoin, setSelectedCoin] = useState();
  const { currency, theme } = CryptoState();
  const { setCurrency } = CryptoState();
  const data = [
    // { label: "USD", value: "usd" },
    { label: "PKR", value: "pkr" },
    { label: "INR", value: "inr" },
    { label: "EUR", value: "eur" },
    { label: "GBP", value: "gbp" },
    { label: "CAD", value: "cad" },
    { label: "AUD", value: "aud" },
    { label: "CNY", value: "cny" },
    { label: "RUB", value: "rub" },
    { label: "IDR", value: "idr" },
    { label: "MXN", value: "mxn" },
    { label: "ILS", value: "ils" },
    { label: "JPY", value: "jpy" },
    { label: "NZD", value: "nzd" },
    { label: "NOK", value: "nok" },
    { label: "SEK", value: "sek" },
    { label: "CHF", value: "chf" },
    { label: "SGD", value: "sgd" },
    { label: "THB", value: "thb" },
    { label: "TWD", value: "twd" },
    { label: "ZAR", value: "zar" },
    { label: "BGN", value: "bgn" },
    { label: "HKD", value: "hkd" },
    { label: "PHP", value: "php" },
    { label: "TRY", value: "try" },
    { label: "UAH", value: "uah" },
    { label: "CZK", value: "czk" },
    { label: "PLN", value: "pln" },
  ];

  const fetch = async () => {
    const { data } = await axios.get(CoinList(currency)).catch((error) => {
      console.log(error);
    });
    // console.log(data);

    //fitler data array to get name and price
    const filteredData = data.map((coin) => {
      const temp = {
        logo: coin.image,
        label: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
      };
      return temp;
    });
    setTrendingCoins(filteredData);
    // console.log(trendingCoins);
  };
  const fetchNewCurrency = async () => {
    const { data } = await axios
      .get(CoinList(selectedCurrency))
      .catch((error) => {
        console.log(error);
      });
    const filteredData = data.map((coin) => {
      const temp = {
        logo: coin.image,
        label: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
      };
      return temp;
    });
    setSelectedCoin(filteredData);
  };
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    fetch();
  }, [currency]);
  useEffect(() => {
    fetchNewCurrency();
  }, [selectedCurrency]);
  const placeholder = {
    label: "USD",
    value: "usd",
    color: "black",
  };

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
              paddingHorizontal: "5%",
              paddingVertical: "5%",
            },
          ]}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              Compare
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>Name</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text>{currency.toUpperCase()}</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <RNPickerSelect
                placeholder={placeholder}
                items={data}
                onValueChange={(value) => {
                  console.log(value);
                  setSelectedCurrency(value);
                }}
                style={pickerSelectStyles}
                value={selectedCurrency}
              />
            </View>
          </View>

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
            {/* {trendingCoins &&
              trendingCoins.map((coin) => (
                <View>
                  <Text>{coin.id}</Text>
                </View>
              ))} */}
            <Compare />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CompareScreen;

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
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    width: "100%",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
