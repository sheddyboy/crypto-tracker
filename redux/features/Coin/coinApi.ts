import {
  CoinListData,
  HistoricalCoinData,
  SingleCoinsData,
  TrendingCoinsData,
} from "@/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const coinApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getCoinList: builder.query<CoinListData[], { currency: string }>({
      query: ({ currency }) =>
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    }),
    getSingleCoin: builder.query<SingleCoinsData, { id: string }>({
      query: ({ id }) => `https://api.coingecko.com/api/v3/coins/${id}`,
    }),
    getHistoricalData: builder.query<
      HistoricalCoinData,
      { currency: string; id: string; days: number }
    >({
      query: ({ currency, days, id }) =>
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
    }),
    getTrendingCoins: builder.query<TrendingCoinsData[], { currency: string }>({
      query: ({ currency }) =>
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
    }),
  }),
});
export const {
  useGetCoinListQuery,
  useGetHistoricalDataQuery,
  useGetSingleCoinQuery,
  useGetTrendingCoinsQuery,
} = coinApi;
export default coinApi;
