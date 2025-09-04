import { REDUCER } from "../config/constants";

export const filterState = (state: any) => state[REDUCER.PRODUCTS].filter;
export const productsState = (state: any) => state[REDUCER.PRODUCTS].products;
export const selectedProductState = (state: any) =>
  state[REDUCER.PRODUCTS].selectedProduct;

