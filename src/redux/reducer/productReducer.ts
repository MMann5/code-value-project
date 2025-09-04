import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { REDUCER } from "../../config/constants";
import type { Product } from "../../types/product.type";

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
  products: [
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      price: 100,
      creationDate: new Date(),
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      price: 200,
      creationDate: new Date(),
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description 3",
      price: 300,
      creationDate: new Date(),
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description 4",
      price: 400,
      creationDate: new Date(),
    },
    {
      id: 5,
      name: "Product 5",
      description: "Description 5",
      price: 100,
      creationDate: new Date(),
    },
    {
      id: 6,
      name: "Product 6",
      description: "Description 6",
      price: 200,
      creationDate: new Date(),
    },
    {
      id: 7,
      name: "Product 7",
      description: "Description 7",
      price: 300,
      creationDate: new Date(),
    },
    {
      id: 8,
      name: "Product 8",
      description: "Description 8",
      price: 400,
      creationDate: new Date(),
    },
    {
      id: 9,
      name: "Product 9",
      description: "Description 9",
      price: 500,
      creationDate: new Date(),
    },
    {
      id: 10,
      name: "Product 10",
      description: "Description 10",
      price: 600,
      creationDate: new Date(),
    },
    {
      id: 11,
      name: "Product 11",
      description: "Description 11",
      price: 700,
      creationDate: new Date(),
    },
    {
      id: 12,
      name: "Product 12",
      description: "Description 12",
      price: 800,
      creationDate: new Date(),
    },
  ],
  filter: {
    value: "all",
    sort: {
      value: "all",
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
    setFilter(
      state,
      action: PayloadAction<{
        value: string;
        sort: { value: string; label: string };
      }>
    ) {
      state.filter = action.payload;
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
