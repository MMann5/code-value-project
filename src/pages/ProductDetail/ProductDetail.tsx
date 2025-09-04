import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectedProductState } from "../../redux/selector";
import {
  updateProduct,
  setSelectedProduct,
} from "../../redux/reducer/productReducer";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import TextArea from "../../components/TextArea/TextArea";
import type { Product } from "../../types/product.type";
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

const ProductDetail = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectedProductState);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  // Mettre à jour le formulaire quand un produit est sélectionné
  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description || "",
        price: selectedProduct.price.toString(),
      });
      setErrors({});
      setIsDirty(false);
    }
  }, [selectedProduct]);

  // Validation des champs
  const validateField = (
    name: keyof FormData,
    value: string
  ): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "name is required";
        if (value.length > 30)
          return "name cannot be longer than 30 characters";
        break;
      case "description":
        if (value.length > 200)
          return "description cannot be longer than 200 characters";
        break;
      case "price":
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
    setIsDirty(true);

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSave = () => {
    if (!selectedProduct || !validateForm()) return;

    const updatedProduct: Product = {
      ...selectedProduct,
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      price: parseFloat(formData.price),
    };

    dispatch(updateProduct(updatedProduct));
    setIsDirty(false);
  };

  const handleCancel = () => {
    dispatch(setSelectedProduct(null as any));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={logo}
          alt={selectedProduct.name}
          className={styles.productImage}
        />
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
            placeholder="Nom du produit"
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
            placeholder="Description du produit"
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
            disabled={!isDirty || Object.keys(errors).length > 0}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
