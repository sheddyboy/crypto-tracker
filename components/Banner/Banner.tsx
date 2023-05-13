"use client";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

interface BannerProps {}

export default function Banner({}: BannerProps) {
  return (
    <>
      <div className="bg-banner-image ">
        <Container className="h-[400px] flex flex-col pt-[25px] justify-between">
          <div className="flex h-[40%] flex-col justify-center text-center">
            <Typography
              variant="h2"
              className=" font-bold mb-[15px] font-montserrat"
            >
              Crypto Hunter
            </Typography>
            <Typography
              variant="subtitle2"
              className="text-[darkgrey] capitalize font-montserrat"
            >
              Get all the Info regarding your favorite Crypto Currencies
            </Typography>
          </div>
          <Carousel />
        </Container>
      </div>
    </>
  );
}
