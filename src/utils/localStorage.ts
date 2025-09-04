import type { Product } from "../types/product.type";
import { defaultProducts as defaultProductsData } from "./data";

export const getProductsFromLocalStorage = (): Product[] => {
  const products = localStorage.getItem("products");
  if (!products) return [];

  const parsedProducts = JSON.parse(products);
  return parsedProducts.map((product: any) => ({
    ...product,
    creationDate: new Date(product.creationDate),
  }));
};

export const setProductsToLocalStorage = (products: Product[]) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const loadProductsFromStorage = (): Product[] => {
  const storedProducts = getProductsFromLocalStorage();
  if (storedProducts.length === 0) {
    setProductsToLocalStorage(defaultProductsData);
    return defaultProductsData;
  }
  return storedProducts;
};
