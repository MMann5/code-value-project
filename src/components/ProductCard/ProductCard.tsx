import React from "react";
import styles from "./ProductCard.module.scss";
import Button from "../Button/Button";
import type { Product } from "../../types/product.type";
import logo from "../../assets/product.svg";
import {
  deleteProduct,
  setSelectedProduct,
} from "../../redux/reducer/productReducer";
import { useDispatch } from "react-redux";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product));
  };

  const onSelect = () => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div className={styles.card} onClick={onSelect}>
      <div className={styles.imageContainer}>
        <img src={logo} alt={product.name} className={styles.productImage} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product?.description}</p>
        {product.price && (
          <span className={styles.price}>${product.price}</span>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="small"
          onClick={onDelete}
          className={styles.deleteButton}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
