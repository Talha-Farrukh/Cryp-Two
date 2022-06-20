import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { Divider, Switch } from "react-native-paper";
import { CryptoState } from "../CryptoContext";
import { useEffect } from "react";
import { darkColor, lightColor } from "../Colors";

const SettingScreen = () => {
  const { currency, setCurrency } = CryptoState();
  const data = ["usd", "pkr"];
  const { theme, setTheme } = CryptoState();
  const [isEnabled, setIsEnabled] = React.useState(false);
  useEffect(() => {
    console.log(theme);
  }, [isEnabled]);

  const onToggle = () => {
    setIsEnabled(!isEnabled);
    setTheme(theme === "dark" ? "light" : "dark");
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
            <SelectDropdown
              data={data}
              onSelect={(selectedItem, index) => {
                setCurrency(selectedItem);
              }}
              defaultButtonText="Currency"
              renderDropdownIcon={() => (
                <AntDesign name="downcircleo" size={20} color="black" />
              )}
              buttonStyle={{
                borderRadius: 20,
                height: 40,
                width: "37%",
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
              Set Theme
            </Text>
            <Switch onValueChange={onToggle} value={isEnabled} />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "6%",
    paddingHorizontal: "6%",
  },
});
