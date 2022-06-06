import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CryptoState } from "../CryptoContext";

const CoinListItems = ({ coins, search }) => {
  const navigation = useNavigation();
  // const [chartData, setChartData] = useState();
  const { symbol } = CryptoState();
  // data = [
  //   -0.23, 23, -90, -9, -0.23, 23, 100, -9, -0.23, 23, -100, -9, -0.23, 23, 100,
  //   -9,
  // ];

  if (!coins) {
    return <></>;
  } else {
    return coins.map((row) => {
      const profit = row.price_change_percentage_24h > 0;
      return (
        <TouchableOpacity
          key={row.name}
          onPress={() =>
            navigation.navigate("CoinDetails", {
              item: row,
            })
          }
        >
          <View style={styles.coinList}>
            <Image
              source={{
                uri: row.image,
              }}
              resizeMode="contain"
              style={styles.coinImage}
            />
            <View
              style={{
                width: "20%",
              }}
            >
              <Text>
                {row.name.length > 9 ? row.name.slice(0, 8) + ".." : row.name}
              </Text>
              <Text>
                {row.market_cap_rank} {row.symbol.toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                width: "30%",
                height: 50,
              }}
            ></View>
            <View style={{ alignItems: "flex-end", width: "30%" }}>
              <Text>
                {symbol === "$" ? symbol : symbol + " "}
                {row.current_price.toFixed(0)}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ paddingRight: 5, opacity: 0.5 }}>
                  {profit && "+"}
                  {row.price_change_24h.toFixed(0)}
                </Text>
                <Text style={{ color: profit ? "green" : "red" }}>
                  {profit && "+"}
                  {row.price_change_percentage_24h.toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }
};

export default CoinListItems;

const styles = StyleSheet.create({
  coinList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coinImage: {
    height: 40,
    width: 40,
  },
});
