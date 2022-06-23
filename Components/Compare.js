import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { darkColor, lightColor } from "../Colors";

const Compare = ({
  name,
  image,
  price,
  coinSymbol,
  newPrice,
  currency,
  newCurrency,
  currencyIcon,
}) => {
  const { symbol, theme } = CryptoState();

  return (
    <>
      <View
        style={{
          marginVertical: "3%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "30%",
            // alignItems: "center",
            // justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Image source={{ uri: image }} style={{ width: 38, height: 38 }} />
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
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color:
                theme === "light" ? lightColor.fontColor : darkColor.fontColor,
            }}
          >
            {symbol} {price}
          </Text>
        </View>
        <View
          style={{
            width: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color:
                theme === "light" ? lightColor.fontColor : darkColor.fontColor,
            }}
          >
            {currencyIcon} {newPrice}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Compare;

const styles = StyleSheet.create({});
