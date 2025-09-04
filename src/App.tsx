import { PAGES } from "./config/constants";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <Routes>
      <Route path={PAGES.PRODUCTS} element={<Products />} />
      <Route path={PAGES.PRODUCT_DETAILS} element={<ProductDetails />} />
    </Routes>
  );
};

export default App;
