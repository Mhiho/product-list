import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./productsReducer";

const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
