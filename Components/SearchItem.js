import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { darkColor, lightColor } from "../Colors";
import { CryptoState } from "../CryptoContext";

const SearchItem = (props) => {
  const { symbol, theme } = CryptoState();
  return (
    <>
      <View style={styles.container} key={props.index}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: props.image,
            }}
            resizeMode="contain"
            style={styles.coinImage}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    theme === "light"
                      ? lightColor.fontColor
                      : darkColor.fontColor,
                },
              ]}
            >
              {props.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
              // style={styles.underText}
              >
                <Text
                  //  style={{ color: "white" }}
                  style={{
                    color:
                      theme === "light"
                        ? lightColor.fontColor
                        : darkColor.fontColor,
                  }}
                >
                  {props.rank + " "}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "bold",
                  color:
                    theme === "light"
                      ? lightColor.fontColor
                      : darkColor.fontColor,
                }}
              >
                {props.symbol.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "right",
              color:
                theme === "light" ? lightColor.fontColor : darkColor.fontColor,
            }}
          >
            {symbol === "$" ? symbol : symbol + " "}
            {props.price.toFixed(0)}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 9.5,
                paddingRight: 5,
                textAlign: "right",
                opacity: 0.4,
                color:
                  theme === "light"
                    ? lightColor.fontColor
                    : darkColor.fontColor,
              }}
            >
              {props.priceChange >= 0
                ? `+${props.priceChange.toFixed(0)}`
                : props.priceChange.toFixed(0)}
            </Text>
            <Text
              style={{
                fontSize: 9.5,
                fontWeight: "bold",
                textAlign: "right",
                color: props.priceChangePercent > 0 ? "green" : "red",
              }}
            >
              {props.priceChangePercent > 0
                ? `+${props.priceChangePercent.toFixed(2)}%`
                : `${props.priceChangePercent.toFixed(2)}%`}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  coinImage: {
    width: 40,
    height: 40,
  },
  underText: {
    backgroundColor: "#8d918e",
    width: 30,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 12,
    marginRight: 5,
  },
  text: {
    fontSize: 15,
  },
});
