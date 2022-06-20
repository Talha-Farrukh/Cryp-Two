import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");
  const [theme, setTheme] = useState("light");

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
