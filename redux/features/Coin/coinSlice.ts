import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currencies = [
  { name: "USD", symbol: "$" },
  { name: "NGN", symbol: "₦" },
];

const coinSlice = createSlice({
  name: "coinSlice",
  initialState: { currency: { name: "USD", symbol: "$" } },
  reducers: {
    setCurrency: (state, action: PayloadAction<{ name: string }, string>) => {
      state.currency = currencies.find(
        (currency) => action.payload.name === currency.name
      ) ?? { name: "USD", symbol: "$" };
    },
  },
});
export const { setCurrency } = coinSlice.actions;
export default coinSlice;
