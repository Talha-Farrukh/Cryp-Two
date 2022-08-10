import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkColor, lightColor } from "../Colors";
import { CryptoState } from "../CryptoContext";

const SettingScreen = () => {
  const [connection, setConnection] = useState(true);
  NetInfo.fetch().then((state) => {
    state.isConnected ? setConnection(true) : setConnection(false);
  });
  const { currency, setCurrency } = CryptoState();
  const placeholder = {
    label: "USD",
    value: "usd",
    color: "black",
  };
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
  const { theme, setTheme } = CryptoState();
  const [isEnabled, setIsEnabled] = useState(false);
  const onToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    setIsEnabled(theme === "dark" ? true : false);
  }, [theme]);

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
        <View>
          <Text
            style={{
              color: "#ffff",
              padding: 15,
              fontSize: Platform.OS === "android" ? 20 : 16,
              alignSelf: "center",
            }}
          >
            Settings
          </Text>
        </View>
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
            <View>
              <Text
                style={{
                  fontSize: Platform.OS === "android" ? 17 : 14,
                  color:
                    theme === "light"
                      ? lightColor.fontColor
                      : darkColor.fontColor,
                }}
              >
                Set Currency
              </Text>
            </View>
            <View style={{ width: "30%" }}>
              <RNPickerSelect
                placeholder={placeholder}
                items={data}
                onValueChange={async (value) => {
                  setCurrency(value);
                  //currency saved to async storage logic
                  try {
                    await AsyncStorage.setItem(
                      "currency",
                      JSON.stringify(value)
                    );
                  } catch {
                    (err) => console.log(err.message);
                  }
                }}
                style={{
                  inputIOS: {
                    color:
                      theme === "light"
                        ? lightColor.fontColor
                        : darkColor.fontColor,
                    // fontSize: 16,
                    textAlign: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 4,
                    width: "100%",
                    // marginRight: 30,
                  },
                  inputAndroid: {
                    color:
                      theme === "light"
                        ? lightColor.fontColor
                        : darkColor.fontColor,
                    // fontSize: 16,
                    // textAlign: "center",
                    // paddingVertical: 12,
                    // paddingHorizontal: 10,
                    // borderWidth: 1,
                    // borderColor: "gray",
                    // borderRadius: 4,
                    width: "100%",
                    // marginRight: 30,
                  },
                }}
                value={currency}
              />
            </View>
          </View>
          <Divider
            style={{
              width: "90%",
              alignSelf: "center",
              backgroundColor:
                theme === "light" ? lightColor.fontColor : darkColor.fontColor,
            }}
          />
          <View style={styles.bodyTop}>
            <Text
              style={{
                fontSize: Platform.OS === "android" ? 17 : 14,
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              Dark Mode
            </Text>
            <Switch value={isEnabled} onValueChange={onToggle} />
          </View>
          <Divider
            style={{
              width: "90%",
              alignSelf: "center",
              backgroundColor:
                theme === "light" ? lightColor.fontColor : darkColor.fontColor,
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SettingScreen;

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
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
});
