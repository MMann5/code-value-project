import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../../types/product.type";
import { setSelectedProduct } from "../../redux/reducer/productReducer";
import { productsState, selectedProductState } from "../../redux/selector";
import styles from "../Products/Products.module.scss";
import Header from "../../components/Header/Header";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ControlPanels from "../../components/ControlPanels/ControlPanels";
import ProductsList from "../../components/ProductsList/ProductsList";

const DetailsPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const products = useSelector(productsState);
  const selectedProduct = useSelector(selectedProductState);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (params?.id) {
      const product = products.find(
        (product: Product) => product.id === Number(params.id)
      );
      dispatch(setSelectedProduct(product as Product));
    }
  }, [params?.id]);

  const handleFilteredProductsChange = (products: Product[]) => {
    setFilteredProducts(products);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <ControlPanels
          onFilteredProductsChange={handleFilteredProductsChange}
        />
        <div
          className={
            selectedProduct
              ? styles.productsListWithDetail
              : styles.productsList
          }
        >
          <ProductsList products={filteredProducts} />
          {selectedProduct && <ProductDetail />}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
