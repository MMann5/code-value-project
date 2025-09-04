import { PAGES } from "./config/constants";
import { Route, Routes, Navigate } from "react-router-dom";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PAGES.PRODUCTS} replace />} />
      <Route path={PAGES.PRODUCTS} element={<Products />} />
      <Route path={PAGES.PRODUCT_DETAILS} element={<ProductDetails />} />
      <Route path="*" element={<Products />} />
    </Routes>
  );
};

export default App;
