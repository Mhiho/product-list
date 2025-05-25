import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductItem } from "../types/Product";
import rawProducts from "../../product-list.json";

interface ProductListState {
  products: ProductItem[];
}

const productsData: ProductItem[] = Array.isArray(rawProducts)
  ? (rawProducts as ProductItem[]).map((product) => ({
      ...product,
      id: Math.random().toString(36).slice(2),
    }))
  : [];

const initialState: ProductListState = {
  products: productsData as ProductItem[],
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductItem[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<ProductItem>) {
      state.products.push(action.payload);
    },
    editProduct(state, action: PayloadAction<ProductItem>) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
  },
});

export const { setProducts, addProduct, editProduct } =
  productListSlice.actions;
export default productListSlice.reducer;
