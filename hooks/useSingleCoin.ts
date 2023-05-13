"use client";
import { CoinListData, SingleCoinsData } from "@/type";
import { useEffect, useState } from "react";

export default function useSingleCoin(id: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SingleCoinsData | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
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
  }, [id]);
  return { data, error, loading };
}
