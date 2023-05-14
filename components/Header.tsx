"use client";
import { useAppDispatch, useAppSelector } from "@/redux/app/hook";
import { setCurrency } from "@/redux/features/Coin/coinSlice";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Link from "next/link";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.coinSlice);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Link href="/">
              <Typography
                variant="h6"
                className=" flex-[1] text-[gold] font-montserrat font-bold cursor-pointer"
              >
                Crypto Tracker
              </Typography>
            </Link>
            <Select
              variant="outlined"
              sx={{ width: 100, height: 40, mr: "15px" }}
              value={currency.name}
              onChange={(e) => {
                dispatch(setCurrency({ name: e.target.value }));
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="NGN">NGN</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
