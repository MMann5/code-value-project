import {
  loadProductsFromStorage,
  setProductsToLocalStorage,
} from "../../utils/localStorage";
import { ALL } from "../../config/keys";
import { REDUCER } from "../../config/constants";
import type { Product } from "../../types/product.type";
import { defaultProducts } from "../../utils/data";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
  filter: {
    value: string;
    sort: {
      value: string;
      label: string;
    };
  };
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: loadProductsFromStorage(),
  filter: {
    value: "",
    sort: {
      value: ALL,
      label: "All",
    },
  },
  selectedProduct: null,
};

const productSlice = createSlice({
  name: REDUCER.PRODUCTS,
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      setProductsToLocalStorage(state.products);
    },
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products = [action.payload, ...state.products];
      setProductsToLocalStorage(state.products);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.products = state.products.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      setProductsToLocalStorage(state.products);
    },
    deleteProduct(state, action: PayloadAction<Product>) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      setProductsToLocalStorage(state.products);
    },
    setFilter(
      state,
      action: PayloadAction<{
        value: string;
        sort: { value: string; label: string };
      }>
    ) {
      state.filter = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.filter.value = action.payload;
    },
    setSortOption(
      state,
      action: PayloadAction<{ value: string; label: string }>
    ) {
      state.filter.sort = action.payload;
    },
    resetToDefaultProducts(state) {
      state.products = defaultProducts;
      setProductsToLocalStorage(state.products);
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  setSearchValue,
  setSortOption,
  resetToDefaultProducts,
} = productSlice.actions;

export default productSlice.reducer;
