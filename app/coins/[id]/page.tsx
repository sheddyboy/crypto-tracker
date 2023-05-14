"use client";
import CoinInfo from "@/components/CoinInfo";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { numberWithCommas } from "@/helpers";
import { CircularProgress } from "@mui/material";
import parse from "html-react-parser";
import { useAppSelector } from "@/redux/app/hook";
import { useGetSingleCoinQuery } from "@/redux/features/Coin/coinApi";

interface pageProps {
  params: { id: string };
}

export default function CoinPage({ params }: pageProps) {
  const { currency } = useAppSelector((state) => state.coinSlice);
  const { data: coin, isLoading } = useGetSingleCoinQuery({ id: params.id });
  return (
    <div className="flex max-md:flex-col max-md:items-center">
      <div className="w-[30%] flex flex-col items-center mt-[25px] border-r-[2px] border-r-[grey] max-md:w-[100%]">
        {coin ? (
          <Image
            alt={coin.id}
            src={coin.image.large}
            height={200}
            width={200}
            className="mb-[20px]"
          />
        ) : (
          <CircularProgress sx={{ color: "gold" }} size={200} thickness={1} />
        )}
        <Typography
          variant="h3"
          className=" font-bold font-montserrat mb-[20px]"
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          className="w-full font-montserrat p-[25px] pb-[15px] pt-[0px] text-justify"
        >
          {coin && parse(coin.description.en.split(". ")[0])}
        </Typography>
        <div className="md:self-start md:p-[25px] md:pt-[10px] md:w-full max-md:flex max-md:justify-around max-sm:flex-col max-sm:items-start p-[25px]">
          <span className="flex">
            <Typography variant="h5" className="">
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className="font-montserrat">
              {coin?.market_cap_rank} 
            </Typography>
          </span>
          <span className="flex">
            <Typography variant="h5" className="">
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className="font-montserrat">
              {currency.symbol}
              {coin &&
                numberWithCommas(
                  coin.market_data.current_price[
                    currency.name.toLowerCase()
                  ].toString()
                )}
               
            </Typography>
          </span>
          <span className="flex">
            <Typography variant="h5" className="">
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className="font-montserrat">
              {currency.symbol}
              {coin &&
                numberWithCommas(
                  coin.market_data.market_cap[currency.name.toLowerCase()]
                    .toString()
                    .slice(0, 6)
                )}
              M
            </Typography>
          </span>
        </div>
      </div>
      {coin && <CoinInfo coin={coin} />}
    </div>
  );
}
