import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkColor, lightColor } from "../Colors";
import Compare from "../Components/Compare";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CompareScreen = () => {
  const [trendingCoins, setTrendingCoins] = useState();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { currency, theme } = CryptoState();
  const { setCurrency } = CryptoState();
  const [currencyIcon, setCurrencyIcon] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    if (selectedCurrency === "pkr") setCurrencyIcon("Rs");
    else if (selectedCurrency === "usd") setCurrencyIcon("$");
    else if (selectedCurrency === "inr") setCurrencyIcon("₹");
    else if (selectedCurrency === "eur") setCurrencyIcon("€");
    else if (selectedCurrency === "gbp") setCurrencyIcon("£");
    else if (selectedCurrency === "cad") setCurrencyIcon("$");
    else if (selectedCurrency === "aud") setCurrencyIcon("$");
    else if (selectedCurrency === "brl") setCurrencyIcon("R$");
    else if (selectedCurrency === "cny") setCurrencyIcon("¥");
    else if (selectedCurrency === "rub") setCurrencyIcon("₽");
    else if (selectedCurrency === "idr") setCurrencyIcon("Rp");
    else if (selectedCurrency === "mxn") setCurrencyIcon("$");
    else if (selectedCurrency === "ils") setCurrencyIcon("₪");
    else if (selectedCurrency === "jpy") setCurrencyIcon("¥");
    else if (selectedCurrency === "nzd") setCurrencyIcon("$");
    else if (selectedCurrency === "nok") setCurrencyIcon("kr");
    else if (selectedCurrency === "sek") setCurrencyIcon("kr");
    else if (selectedCurrency === "chf") setCurrencyIcon("Fr");
    else if (selectedCurrency === "sgd") setCurrencyIcon("$");
    else if (selectedCurrency === "thb") setCurrencyIcon("฿");
    else if (selectedCurrency === "twd") setCurrencyIcon("NT$");
    else if (selectedCurrency === "zar") setCurrencyIcon("R");
    else if (selectedCurrency === "bgn") setCurrencyIcon("лв");
    else if (selectedCurrency === "hkd") setCurrencyIcon("$");
    else if (selectedCurrency === "php") setCurrencyIcon("₱");
    else if (selectedCurrency === "try") setCurrencyIcon("₺");
    else if (selectedCurrency === "uah") setCurrencyIcon("₴");
    else if (selectedCurrency === "czk") setCurrencyIcon("Kč");
    else if (selectedCurrency === "pln") setCurrencyIcon("zł");
  }, [selectedCurrency]);

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
        id: coin.id,
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
      const temp = { newPrice: coin.current_price };
      return temp;
    });
    setSelectedCoin(filteredData);
  };

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
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                width: "42%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color:
                    theme === "light"
                      ? lightColor.fontColor
                      : darkColor.fontColor,
                }}
              >
                Name
              </Text>
            </View>
            <View
              style={{
                width: "30%",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color:
                    theme === "light"
                      ? lightColor.fontColor
                      : darkColor.fontColor,
                }}
              >
                {currency.toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                width: "32%",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <RNPickerSelect
                placeholder={placeholder}
                items={data}
                onValueChange={(value) => {
                  // console.log(value);
                  setSelectedCurrency(value);
                }}
                style={{
                  inputIOS: {
                    color:
                      theme === "light"
                        ? lightColor.fontColor
                        : darkColor.fontColor,
                    fontSize: 16,
                    textAlign: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 4,
                    width: "100%",
                    marginRight: 30,
                  },
                  inputAndroid: {
                    color:
                      theme === "light"
                        ? lightColor.fontColor
                        : darkColor.fontColor,

                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: "purple",
                    borderRadius: 8,
                    paddingRight: 30,
                  },
                }}
                value={selectedCurrency}
              />
            </View>
          </View>
          <View style={{ height: "70%" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {trendingCoins &&
                trendingCoins.map((coin, i) => (
                  <Compare
                    id={coin.id}
                    image={coin.logo}
                    name={
                      coin.label.length > 9
                        ? coin.label.slice(0, 8) + ".."
                        : coin.label
                    }
                    price={coin.price}
                    coinSymbol={coin.symbol}
                    newPrice={
                      selectedCoin == null
                        ? coin.price
                        : selectedCoin[i].newPrice
                    }
                    currency={currency}
                    currencyIcon={currencyIcon}
                  />
                ))}
            </ScrollView>
          </View>
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
    paddingRight: 30,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    width: "100%",
    marginRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
