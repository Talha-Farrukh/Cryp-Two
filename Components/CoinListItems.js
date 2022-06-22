import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { darkColor, lightColor } from "../Colors";
import { CryptoState } from "../CryptoContext";

const CoinListItems = ({ coins }) => {
  const navigation = useNavigation();
  const { symbol, theme } = CryptoState();
  if (!coins) {
    return <></>;
  } else {
    return coins.map((row) => {
      const profit = row.price_change_percentage_24h > 0;
      return (
        <View key={row.id}>
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
                <Text
                  style={{
                    color:
                      theme === "light"
                        ? lightColor.fontColor
                        : darkColor.fontColor,
                  }}
                >
                  {row.name.length > 9 ? row.name.slice(0, 8) + ".." : row.name}
                </Text>
                <Text
                  style={{
                    color:
                      theme === "light"
                        ? lightColor.fontColor
                        : darkColor.fontColor,
                  }}
                >
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
                <Text
                  style={{
                    color:
                      theme === "light"
                        ? lightColor.fontColor
                        : darkColor.fontColor,
                  }}
                >
                  {symbol !== "Rs" ? symbol : symbol + " "}
                  {row.current_price.toFixed(0)}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      paddingRight: 5,
                      opacity: 0.5,
                      color:
                        theme === "light"
                          ? lightColor.fontColor
                          : darkColor.fontColor,
                    }}
                  >
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
          {theme === "light" ? (
            <></>
          ) : (
            <Divider
              style={{
                width: "90%",
                alignSelf: "center",
                backgroundColor:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            />
          )}
        </View>
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
