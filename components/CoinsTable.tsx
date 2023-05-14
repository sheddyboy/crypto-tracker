"use client";
import { numberWithCommas } from "@/helpers";
import { useAppSelector } from "@/redux/app/hook";
import { useGetCoinListQuery } from "@/redux/features/Coin/coinApi";
import { CoinListData } from "@/type";
import {
  Container,
  ThemeProvider,
  createTheme,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CoinsTableProps {}

export default function CoinsTable({}: CoinsTableProps) {
  const { currency } = useAppSelector((state) => state.coinSlice);
  const { data: coins, isLoading } = useGetCoinListQuery({
    currency: currency.name,
  });
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  const handleSearch = (coins: CoinListData[]) => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" className="m-[18px] font-montserrat">
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency"
          variant="outlined"
          fullWidth
          className="mb-[20px] "
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {isLoading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ background: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      className=" text-[black] font-bold font-montserrat"
                      align={head === "Coin" ? "inherit" : "right"}
                      key={head}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {coins && (
                <TableBody>
                  {handleSearch(coins)
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((coin) => {
                      const profit = coin.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          key={coin.id}
                          onClick={() => {
                            router.push(`/coins/${coin.id}`);
                          }}
                          className="bg-[#16171a] cursor-pointer hover:bg-[#131111] font-montserrat"
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className="flex gap-[15px]"
                          >
                            <Image
                              src={coin.image}
                              alt={coin.id}
                              width={50}
                              height={50}
                              className="mb-[10px]"
                            />
                            <div className="flex flex-col">
                              <span className=" uppercase text-[22px]">
                                {coin.symbol}
                              </span>
                              <span className="text-[grey]">{coin.name}</span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {currency.symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={`${
                              profit ? "text-[#0ecb81]" : "text-[red]"
                            } font-medium`}
                          >
                            {profit && "+"}
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {currency.symbol}
                            {numberWithCommas(
                              coin.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          )}
        </TableContainer>
        {coins && (
          <Pagination
            className="flex w-full p-[20px] justify-center"
            count={Number((handleSearch(coins).length / 10).toFixed(0))}
            sx={{
              "& .MuiPaginationItem-root": { color: "gold" },
            }}
            onChange={(e, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}
