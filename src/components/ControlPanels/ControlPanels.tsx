import {
  setSearchValue,
  setSortOption,
} from "../../redux/reducer/productReducer";
import { IoMdAdd } from "react-icons/io";
import { useState, useMemo, useEffect } from "react";
import type { Product } from "../../types/product.type";
import { useSelector, useDispatch } from "react-redux";
import { filterState, productsState } from "../../redux/selector";
import { ALL, NAME_ASC, NAME_DESC, OLDEST, RECENT } from "../../config/keys";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Select from "../Select/Select";
import styles from "./ControlPanels.module.scss";
import PopupWrapper from "../PopupWrapper/PopupWrapper";
import ProductDetail from "../ProductDetail/ProductDetail";

interface ControlPanelsProps {
  onFilteredProductsChange: (products: Product[]) => void;
}

const ControlPanels = ({ onFilteredProductsChange }: ControlPanelsProps) => {
  const dispatch = useDispatch();
  const filter = useSelector(filterState);
  const products = useSelector(productsState);

  const filterOptions = [
    { value: ALL, label: "All" },
    { value: NAME_ASC, label: "A-Z" },
    { value: NAME_DESC, label: "Z-A" },
    { value: RECENT, label: "Recently Added" },
    { value: OLDEST, label: "Oldest Added" },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products;

    if (filter.value && filter.value.trim() !== "") {
      const searchTerm = filter.value.toLowerCase();
      filteredProducts = products.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product?.description?.toLowerCase().includes(searchTerm)
      );
    }

    let sortedProducts = [...filteredProducts];
    switch (filter.sort.value) {
      case ALL:
        break;
      case NAME_ASC:
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case NAME_DESC:
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case RECENT:
        sortedProducts.sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        );
        break;
      case OLDEST:
        sortedProducts.sort(
          (a, b) =>
            new Date(a.creationDate).getTime() -
            new Date(b.creationDate).getTime()
        );
        break;
      default:
        break;
    }

    return sortedProducts;
  }, [products, filter.value, filter.sort.value]);

  useEffect(() => {
    onFilteredProductsChange(filteredAndSortedProducts);
  }, [filteredAndSortedProducts, onFilteredProductsChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = filterOptions.find(
      (option) => option.value === e.target.value
    );
    if (selectedOption) {
      dispatch(setSortOption(selectedOption));
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Button
          variant="primary"
          size="medium"
          onClick={() => setIsPopupOpen(true)}
        >
          <IoMdAdd />
          Add Product
        </Button>
        <Input
          type="text"
          placeholder="Search Product"
          variant="default"
          size="medium"
          value={filter.value}
          onChange={handleSearchChange}
        />
        <div className={styles.sortBy}>
          <p>Sort by : </p>
          <Select
            options={filterOptions}
            placeholder="Sort by..."
            variant="default"
            size="medium"
            value={filter.sort.value}
            onChange={handleSortChange}
          />
        </div>
      </div>
      {isPopupOpen && (
        <PopupWrapper>
          <ProductDetail onClose={() => setIsPopupOpen(false)} />
        </PopupWrapper>
      )}
    </>
  );
};

export default ControlPanels;
