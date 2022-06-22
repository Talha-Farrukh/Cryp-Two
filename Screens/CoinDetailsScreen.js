import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Button, Colors, Divider } from "react-native-paper";
import { Grid, LineChart, YAxis } from "react-native-svg-charts";
import { darkColor, lightColor } from "../Colors";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinDetailsScreen = () => {
  const { symbol, theme, currency } = CryptoState();
  const route = useRoute();
  const { item } = route.params;
  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);

  const fetchData = async () => {
    const price = [];
    const { data } = await axios.get(HistoricalChart(item.id, days, currency));
    for (let i = 0; i < data.prices.length; i++) {
      price.push(data.prices[i][1]);
    }
    setChartData(price);
  };
  useEffect(() => {
    fetchData();
  }, [days, currency]);

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme === "light" ? lightColor.background : darkColor.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 25,
          paddingHorizontal: 15,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: item.image }}
            style={{ height: 50, width: 50 }}
          />
          <View style={{ paddingLeft: 10 }}>
            <Text
              style={{
                fontSize: Platform.OS === "android" ? 20 : 24,
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                opacity: 0.5,
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              {item.symbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: Platform.OS === "android" ? 16 : 20,
              color:
                theme === "light" ? lightColor.fontColor : darkColor.fontColor,
            }}
          >
            {symbol !== "Rs" ? symbol : symbol + " "}
            {item.current_price.toFixed(0)}
          </Text>
          <Text
            style={{
              color: item.price_change_percentage_24h > 0 ? "green" : "red",
            }}
          >
            {item.price_change_percentage_24h > 0 && "+"}
            {item.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
      </View>
      <Divider style={{ width: "90%", alignSelf: "center" }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text
            style={[
              styles.txt_h,
              {
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              },
            ]}
          >
            Low
          </Text>
          <Text
            style={[
              styles.txt_d,
              {
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              },
            ]}
          >
            {symbol !== "RS" ? symbol : symbol + " "}
            {item.low_24h}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.txt_h,
              {
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              },
            ]}
          >
            High
          </Text>
          <Text
            style={[
              styles.txt_d,
              {
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              },
            ]}
          >
            {symbol !== "Rs" ? symbol : symbol + " "}
            {item.high_24h}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.txt_h,
              {
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              },
            ]}
          >
            Vol
          </Text>
          <Text
            style={[
              styles.txt_d,
              {
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              },
            ]}
          >
            {item.max_supply > 1000000
              ? (item.max_supply / 1000000).toFixed(0) + "M"
              : `${item.max_supply}`}
          </Text>
        </View>
      </View>
      {!chartData ? (
        <ActivityIndicator
          animating={true}
          color={Colors.blue300}
          size={50}
          style={{ alignSelf: "center", justifyContent: "center" }}
        />
      ) : (
        <View
          style={{
            height: "60%",
            width: "90%",
            backgroundColor: "#F9F9F9",
            padding: 15,
            borderRadius: 25,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              height: "90%",
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <YAxis
              data={chartData}
              contentInset={contentInset}
              svg={{
                fill: "grey",
                fontSize: 10,
              }}
              numberOfTicks={10}
              formatLabel={(value) => `${value}`}
            />
            <LineChart
              style={{ flex: 1, marginLeft: 16 }}
              data={chartData}
              svg={{ stroke: "#236AF3" }}
              contentInset={contentInset}
            >
              <Grid />
            </LineChart>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setDays(1);
              }}
              style={days === 1 ? styles.btnPress : styles.btn}
            >
              <Text>D</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDays(7);
              }}
              style={days === 7 ? styles.btnPress : styles.btn}
            >
              <Text>W</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDays(30);
              }}
              style={days === 30 ? styles.btnPress : styles.btn}
            >
              <Text>M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDays(120);
              }}
              style={days === 120 ? styles.btnPress : styles.btn}
            >
              <Text>3M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDays(240);
              }}
              style={days === 240 ? styles.btnPress : styles.btn}
            >
              <Text>6M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDays(365);
              }}
              style={days === 365 ? styles.btnPress : styles.btn}
            >
              <Text>Y</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        style={{
          position: "absolute",
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Divider style={{ width: "90%", alignSelf: "center" }} />
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            paddingBottom: 30,
          }}
        >
          <TouchableOpacity
            mode="contained"
            style={{
              borderRadius: 25,
              paddingHorizontal: 35,
              paddingVertical: 10,
              maxHeight: 60,
              backgroundColor:
                theme === "light"
                  ? lightColor.tabBarIndicator
                  : darkColor.tabBarIndicator,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="plus"
                size={24}
                color={"white"}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  color: "white",
                  // theme === "light"
                  //   ? lightColor.fontColor
                  //   : darkColor.fontColor,
                }}
              >
                Add to Portfolio
              </Text>
            </View>
          </TouchableOpacity>
          <Button
            color="#F9F9F9"
            mode="contained"
            style={{
              borderRadius: 25,
              paddingHorizontal: 15,
              paddingVertical: 3,
              marginLeft: 10,
            }}
          >
            <MaterialCommunityIcons
              name="bell-plus-outline"
              size={24}
              color="black"
            />
          </Button>
        </View>

        {/* <TouchableOpacity style={{ backgroundColor: "#236AF3" }}>
          <AntDesign name="plus" size={24} color="white" />
          <Text>Add to Portfolio</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default CoinDetailsScreen;

const styles = StyleSheet.create({
  txt_h: {
    opacity: 0.5,
    fontSize: Platform.OS === "android" ? 16 : 20,
  },
  txt_d: {
    fontSize: Platform.OS === "android" ? 20 : 24,
  },
  btnPress: {
    backgroundColor: "#d7d6d6e3",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "black",
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "rgba(215, 214, 214, 0.506)",
  },
});
