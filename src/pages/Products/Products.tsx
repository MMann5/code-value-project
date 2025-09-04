import { useSelector } from "react-redux";
import { selectedProductState } from "../../redux/selector";
import styles from "./Products.module.scss";
import Header from "../../components/Header/Header";
import ProductDetail from "../ProductDetail/ProductDetail";
import ControlPanels from "../../components/ControlPanels/ControlPanels";
import ProductsList from "../../components/ProductsList/ProductsList";

const Products = () => {
  const selectedProduct = useSelector(selectedProductState);
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <ControlPanels />
        <div
          className={
            selectedProduct
              ? styles.productsListWithDetail
              : styles.productsList
          }
        >
          <ProductsList />
          {selectedProduct && <ProductDetail />}
        </div>
      </div>
    </div>
  );
};

export default Products;
