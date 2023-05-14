import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import coinApi from "../features/Coin/coinApi";
import coinSlice from "../features/Coin/coinSlice";

export const store = configureStore({
  reducer: {
    [coinSlice.name]: coinSlice.reducer,
    [coinApi.reducerPath]: coinApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
