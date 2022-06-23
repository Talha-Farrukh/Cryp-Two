import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Appearance } from "react-native";

const Crypto = createContext();

function CryptoContext({ children }) {
  //getting currency initial value from async storage
  const asyncCurrency = () => {
    AsyncStorage.getItem("currency")
      .then((v) => setCurrency(v.replace(/["]+/g, "")))
      .catch((e) => console.log(e));
  };
  const [currency, setCurrency] = useState();
  useLayoutEffect(() => {
    asyncCurrency();
  }, []);

  //getting deafault color scheme
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme ? colorScheme : "light");
  const [symbol, setSymbol] = useState();

  useEffect(() => {
    if (currency === "pkr") setSymbol("Rs");
    else if (currency === "usd") setSymbol("$");
    else if (currency === "inr") setSymbol("₹");
    else if (currency === "eur") setSymbol("€");
    else if (currency === "gbp") setSymbol("£");
    else if (currency === "cad") setSymbol("$");
    else if (currency === "aud") setSymbol("$");
    else if (currency === "brl") setSymbol("R$");
    else if (currency === "cny") setSymbol("¥");
    else if (currency === "rub") setSymbol("₽");
    else if (currency === "idr") setSymbol("Rp");
    else if (currency === "mxn") setSymbol("$");
    else if (currency === "ils") setSymbol("₪");
    else if (currency === "jpy") setSymbol("¥");
    else if (currency === "nzd") setSymbol("$");
    else if (currency === "nok") setSymbol("kr");
    else if (currency === "sek") setSymbol("kr");
    else if (currency === "chf") setSymbol("Fr");
    else if (currency === "sgd") setSymbol("$");
    else if (currency === "thb") setSymbol("฿");
    else if (currency === "twd") setSymbol("NT$");
    else if (currency === "zar") setSymbol("R");
    else if (currency === "bgn") setSymbol("лв");
    else if (currency === "hkd") setSymbol("$");
    else if (currency === "php") setSymbol("₱");
    else if (currency === "try") setSymbol("₺");
    else if (currency === "uah") setSymbol("₴");
    else if (currency === "czk") setSymbol("Kč");
    else if (currency === "pln") setSymbol("zł");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency, theme, setTheme }}>
      {children}
    </Crypto.Provider>
  );
}

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
