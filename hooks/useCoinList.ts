"use client";
import { CryptoCtx } from "@/context/CryptoContext";
import { CoinListData } from "@/type";
import { useContext, useEffect, useState } from "react";

export default function useCoinList() {
  const { currency } = useContext(CryptoCtx);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CoinListData[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        if (res.ok) {
          const data = await res.json();
          setLoading(false);
          setData(data);
        } else {
          setLoading(false);
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setLoading(false);
        error && setError(error);
      }
    };
    fetchTrendingCoins();
  }, [currency]);
  return { data, error, loading };
}
