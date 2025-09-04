import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { REDUCER } from "../reducer.enum";
import type { Product } from "../../types/product.type";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: REDUCER.PRODUCTS,
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products = [...state.products, action.payload];
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.products = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteProduct(state, action: PayloadAction<Product>) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
