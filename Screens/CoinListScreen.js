import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { darkColor, lightColor } from "../Colors";
import CoinListItems from "../Components/CoinListItems";
import CoinScrollListItems from "../Components/CoinScrollListItems";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinListScreen = () => {
  //Checking connection
  const [connection, setConnection] = useState(true);
  NetInfo.fetch().then((state) => {
    state.isConnected ? setConnection(true) : setConnection(false);
  });

  const [coins, setCoins] = useState();
  const [refresh, setRefresh] = useState(false);
  const { currency } = CryptoState();

  //fectch data from api
  const fetchCoins = async () => {
    setRefresh(true);
    const { data } = await axios
      .get(CoinList(currency))
      .then()
      .catch((err) => console.log(err));
    setCoins(data);
    setRefresh(false);

    //store fetched data in async storage
    AsyncStorage.setItem("coins", JSON.stringify(data)).catch((err) => {
      console.log(err.message);
    });
  };

  //getting data from async storage if connection is false
  const asyncFetchCoins = async () => {
    await AsyncStorage.getItem("coins")
      .then((v) => {
        if (v != null) {
          setRefresh(true);
          setCoins(JSON.parse(v));
          setRefresh(false);
        }
      })
      .catch((err) => console.log(err.message));
  };

  //calling the functions when currency changes
  useEffect(() => {
    connection ? fetchCoins() : asyncFetchCoins();
  }, [currency]);

  const [loaded] = useFonts({
    Montserrat: require("../assets/Fonts/Montserrat-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }
  const { theme } = CryptoState();

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
      <StatusBar
        backgroundColor={
          theme === "light"
            ? lightColor.headerBackground
            : darkColor.headerBackground
        }
        style="light"
        animated
      />
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
              Assets
            </Text>
            <TouchableOpacity
              onPress={() => {
                connection ? fetchCoins() : asyncFetchCoins();
              }}
              disabled={connection ? false : true}
            >
              <AntDesign
                name="reload1"
                size={24}
                color={
                  theme === "light" ? lightColor.fontColor : darkColor.fontColor
                }
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: Platform.OS === "android" ? "46%" : "50%" }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={connection ? fetchCoins : asyncFetchCoins}
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
                  color:
                    theme === "light"
                      ? lightColor.fontColor
                      : darkColor.fontColor,
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
    </View>
  );
};

export default CoinListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "20%",
  },
  bodyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "3%",
    paddingHorizontal: "6%",
  },
});
