import {
  updateProduct,
  addProduct,
  setSelectedProduct,
} from "../../redux/reducer/productReducer";
import { PAGES } from "../../config/constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { Product } from "../../types/product.type";
import { selectedProductState } from "../../redux/selector";
import { useToast } from "../../context/ToastContext";
import * as keys from "../../config/keys";
import Button from "../Button/Button";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import logo from "../../assets/product.svg";
import styles from "./ProductDetail.module.scss";

interface FormData {
  name: string;
  description: string;
  price: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
}

const ProductDetail = ({ onClose }: { onClose?: () => void }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProduct = useSelector(selectedProductState);
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description || "",
        price: selectedProduct.price.toString(),
      });
      setErrors({});
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
      });
      setErrors({});
    }
  }, [selectedProduct]);

  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case keys.NAME:
        if (!value.trim()) return "name is required";
        if (value.length > keys.MAX_NAME_LENGTH)
          return "name cannot be longer than 30 characters";
        break;
      case keys.DESCRIPTION:
        if (value.length > keys.MAX_DESCRIPTION_LENGTH)
          return "description cannot be longer than 200 characters";
        break;
      case keys.PRICE:
        if (!value.trim()) return "price is required";
        const numPrice = parseFloat(value);
        if (isNaN(numPrice)) return "price must be a valid number";
        if (numPrice <= 0) return "price must be positive";
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (selectedProduct) {
      const updatedProduct: Product = {
        ...selectedProduct,
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: parseFloat(formData.price),
      };
      dispatch(updateProduct(updatedProduct));
      handleCancel();
      showToast("Product updated successfully", "success");
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price: parseFloat(formData.price),
        creationDate: new Date(),
      };
      dispatch(addProduct(newProduct));
      showToast("Product added successfully", "success");
    }
    onClose?.();
  };

  const handleCancel = () => {
    if (selectedProduct) {
      navigate(PAGES.PRODUCTS);
      dispatch(setSelectedProduct(null as any));
    }
    setFormData({
      name: "",
      description: "",
      price: "",
    });
    setErrors({});
    onClose?.();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt={"product"} className={styles.productImage} />
        <h2 className={styles.title}>
          {selectedProduct
            ? `${selectedProduct.name} Details`
            : "Add New Product"}
        </h2>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Product Name"
            variant="default"
            size="medium"
            className={errors.name ? styles.errorInput : ""}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <TextArea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Description"
            variant="default"
            size="medium"
            rows={3}
            maxLength={200}
            resize="none"
            className={errors.description ? styles.errorInput : ""}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <div className={styles.priceContainer}>
            <span className={styles.currency}>$</span>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="0"
              variant="default"
              size="medium"
              className={errors.price ? styles.errorInput : ""}
            />
          </div>
          {errors.price && <span className={styles.error}>{errors.price}</span>}
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="outline"
            size="medium"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="medium"
            onClick={handleSave}
            disabled={Object.keys(errors).length > 0}
          >
            {selectedProduct ? "Update" : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
