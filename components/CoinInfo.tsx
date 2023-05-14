"use client";
import { SingleCoinsData } from "@/type";
import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";
import SelectButton from "./SelectButton";
import { useAppSelector } from "@/redux/app/hook";
import { useGetHistoricalDataQuery } from "@/redux/features/Coin/coinApi";

interface CoinInfoProps {
  coin: SingleCoinsData;
}
export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];
export default function CoinInfo({ coin }: CoinInfoProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );
  const [days, setDays] = useState(30);
  const { currency } = useAppSelector((state) => state.coinSlice);
  const { data: historicalData } = useGetHistoricalDataQuery({
    currency: currency.name,
    days,
    id: coin.id,
  });
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="w-full mt-[0px] p-[20px] pt-[0px] md:w-[75%] md:flex md:flex-col md:items-center md:justify-center md:mt-[25px] md:p-[40px] ">
        {!historicalData ? (
          <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData?.prices.map((price) => {
                  let date = new Date(price[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData?.prices.map((price) => price[1]),
                    label: `Price ( Past ${days} Days ) in ${currency.name}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className="flex mt-[20px] justify-around w-full">
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  selected={day.value === days}
                  onClick={() => {
                    setDays(day.value);
                  }}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
