import {
  deleteProduct,
  setSelectedProduct,
} from "../../redux/reducer/productReducer";
import { useDispatch } from "react-redux";
import { PAGES } from "../../config/constants";
import { useToast } from "../../context/ToastContext";
import type { Product } from "../../types/product.type";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import Button from "../Button/Button";
import logo from "../../assets/product.svg";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { showToast } = useToast();

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product));
    showToast("Product deleted successfully", "success");
  };

  const onSelect = () => {
    navigate(`${PAGES.PRODUCTS}/${product.id}`);
    dispatch(setSelectedProduct(product));
  };

  const isSelected = params.id === product.id.toString();

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
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
