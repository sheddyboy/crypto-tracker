"use client";
import { CryptoCtx } from "@/context/CryptoContext";
import { TrendingCoinsData } from "@/type";
import { useContext, useEffect, useState } from "react";

export default function useTrendingCoins() {
  const { currency } = useContext(CryptoCtx);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TrendingCoinsData[] | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
        );
        if (res.ok) {
          const data = await res.json();
          setData(data);
          setLoading(false);
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
