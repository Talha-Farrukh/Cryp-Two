import { Image, StyleSheet, Text, View } from "react-native";
import { darkColor, lightColor } from "../Colors";
import { CryptoState } from "../CryptoContext";

const Compare = ({
  name,
  image,
  price,
  coinSymbol,
  newPrice,
  currencyIcon,
  id,
}) => {
  const { symbol, theme } = CryptoState();

  return (
    <View
      style={{
        marginVertical: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "42%",
          // alignItems: "center",
          // justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "42%",
            // alignItems: "center",
            // justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: 38, height: 38 }}
            resizeMode="contain"
          />
          <View style={{ paddingLeft: 10, justifyContent: "center" }}>
            <Text
              style={{
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
                // fontWeight: "bold",
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              {coinSymbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "31%",
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color:
                theme === "light" ? lightColor.fontColor : darkColor.fontColor,
              // fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color:
                theme === "light" ? lightColor.fontColor : darkColor.fontColor,
            }}
          >
            {coinSymbol.toUpperCase()}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "31%",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color:
              theme === "light" ? lightColor.fontColor : darkColor.fontColor,
          }}
        >
          {symbol} {price < 1 ? price.toFixed(4) : price.toFixed(0)}
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          // alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color:
              theme === "light" ? lightColor.fontColor : darkColor.fontColor,
          }}
        >
          {currencyIcon}{" "}
          {newPrice < 1 ? newPrice.toFixed(4) : newPrice.toFixed(0)}
        </Text>
      </View>
    </View>
  );
};

export default Compare;

const styles = StyleSheet.create({});
