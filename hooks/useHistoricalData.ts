"use client";
import { CryptoCtx } from "@/context/CryptoContext";
import { CoinListData, HistoricalCoinData, SingleCoinsData } from "@/type";
import { useContext, useEffect, useState } from "react";

export default function useHistoricalData({
  coin,
  days,
}: {
  coin: SingleCoinsData;
  days: number;
}) {
  const { currency } = useContext(CryptoCtx);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HistoricalCoinData | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency.name}&days=${days}`
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
  }, [coin.id, currency.name, days]);
  return { data, error, loading };
}
