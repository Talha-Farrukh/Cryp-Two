import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { darkColor, lightColor } from "../Colors";
import { CryptoState } from "../CryptoContext";

const CoinScrollListItems = ({ trendingcoins }) => {
  const navigation = useNavigation();
  const { symbol, theme } = CryptoState();
  if (!trendingcoins) {
    return <></>;
  } else {
    const handleFiltter = () => {
      return trendingcoins.filter(
        (trendingcoins) => trendingcoins.price_change_percentage_24h > 0
      );
    };
    return handleFiltter().map((item) => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate("CoinDetails", {
              item: item,
            })
          }
        >
          <View
            style={[
              styles.container,
              {
                borderColor:
                  theme === "light"
                    ? lightColor.borderColor
                    : darkColor.borderColor,
              },
            ]}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={{ height: 38, width: 38 }}
            />
            <Text
              style={{
                paddingTop: 30,
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              {item.name.length > 18
                ? item.name.slice(0, 16) + ".."
                : item.name}
            </Text>
            <Text
              style={{
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              {symbol === "$" ? symbol : symbol + " "}
              {item.current_price.toFixed(0).toString().length > 5
                ? item.current_price.toExponential(1)
                : item.current_price.toFixed(0)}{" "}
              <Text style={{ color: "green" }}>
                +{item.price_change_percentage_24h.toFixed(2)}%
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }
};

export default CoinScrollListItems;

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 0.4,
    borderRadius: 10,
    width: 130,
    height: 130,
    padding: 10,
    marginRight: 10,
  },
});
