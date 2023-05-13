"use client";
import { createContext, useState } from "react";

type currency = { name: string; symbol: string };
const currencies = [
  { name: "USD", symbol: "$" },
  { name: "NGN", symbol: "₦" },
];

interface CryptoContextProps {
  children: React.ReactNode;
}
interface CryptoCtxProps {
  setCurrentCurrency: (currencyName: string) => void;
  currency: currency;
}

export const CryptoCtx = createContext<CryptoCtxProps>({
  currency: { name: "USD", symbol: "$" },
  setCurrentCurrency: () => {},
});

export default function CryptoContext({ children }: CryptoContextProps) {
  const [currency, setCurrency] = useState<currency>({
    name: "USD",
    symbol: "$",
  });
  const setCurrentCurrency = (currencyName: string) => {
    const currentCurrency = currencies.find(
      (currency) => currency.name === currencyName
    );
    currentCurrency && setCurrency(currentCurrency);
  };
  return (
    <CryptoCtx.Provider value={{ currency, setCurrentCurrency }}>
      {children}
    </CryptoCtx.Provider>
  );
}
