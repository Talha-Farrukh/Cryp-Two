import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkColor, lightColor } from "../Colors";
import CoinListItems from "../Components/CoinListItems";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";
import SelectDropdown from "react-native-select-dropdown";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";

const CompareScreen = () => {
  const [trendingCoins, setTrendingCoins] = useState();
  const { currency, theme } = CryptoState();
  const { setCurrency } = CryptoState();
  const data = [
    { label: "USD", value: "usd" },
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
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  useEffect(() => {
    fetch();
  }, [currency]);
  const placeholder = {
    label: "Select a Currency...",
    value: null,
    color: "#9EA0A4",
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
              Compare
            </Text>
          </View>
          <View>
            <Text>Name</Text>
            <Text>{currency.toUpperCase()}</Text>
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
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>{currency.toUpperCase()}</DataTable.Title>
              <DataTable.Title
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <SelectDropdown
                  data={data}
                  onSelect={(selectedItem) => {
                    setCurrency(selectedItem);
                  }}
                  defaultButtonText="Currency"
                  renderDropdownIcon={() => (
                    <AntDesign name="downcircleo" size={20} color="black" />
                  )}
                  buttonStyle={{
                    borderRadius: 20,
                    height: 40,
                    width: "100%",
                  }}
                  buttonTextStyle={{
                    fontSize: Platform.OS === "android" ? 17 : 13,
                    textTransform: "uppercase",
                  }}
                  statusBarTranslucent={true}
                  dropdownStyle={{
                    borderRadius: 20,
                  }}
                  defaultValueByIndex={0}
                  rowStyle={{ height: 40, width: "100%" }}
                  rowTextStyle={{
                    fontSize: Platform.OS === "android" ? 15 : 11,
                    textTransform: "uppercase",
                  }}
                />
              </DataTable.Title>
            </DataTable.Header>
          </DataTable>
          <View>
            <Text>Name</Text>
            <Text>
              Price in {"\n"}
              {currency.toUpperCase()}
            </Text>
            <Text>Name</Text>
            <Text>Name</Text>
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
