"use client";

import useTrendingCoins from "@/hooks/useTrendingCoins";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { useContext } from "react";
import { CryptoCtx } from "@/context/CryptoContext";
import { numberWithCommas } from "@/helpers";

interface CarouselProps {}

export default function Carousel({}: CarouselProps) {
  const { currency } = useContext(CryptoCtx);
  const { data: coins } = useTrendingCoins();

  return (
    <div className=" h-1/2 flex items-center">
      {coins && (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
          }}
          speed={1500}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
        >
          {coins.map((coin) => {
            const profit = coin.price_change_percentage_24h >= 0;
            return (
              <SwiperSlide
                key={coin.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link
                  href={`/coins/${coin.id}`}
                  className="flex flex-col items-center cursor-pointer uppercase text-[white]"
                >
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    height={80}
                    width={80}
                    style={{ marginBottom: 10, width: 80, height: 80 }}
                  />
                  <span>
                    {coin.symbol}
                    &nbsp;
                    <span
                      className={`${profit ? "text-[#0ecb81]" : "text-[red]"}`}
                    >
                      {profit && "+"}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </span>
                  <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {currency.symbol}
                    {numberWithCommas(coin.current_price.toFixed(2))}
                  </span>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
