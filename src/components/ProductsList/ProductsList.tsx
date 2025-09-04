import { useState, useMemo } from "react";
import type { Product } from "../../types/product.type";
import styles from "./ProductsList.module.scss";
import Pagination from "../Pagination/Pagination";
import ProductCard from "../ProductCard/ProductCard";

interface ProductsListProps {
  products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const result = products.slice(startIndex, endIndex);
    return result;
  }, [products, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      {paginatedProducts.length > 0 ? (
        <div className={styles.productsGrid}>
          {paginatedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.noProducts}>No products found</div>
      )}

      {totalPages > 1 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductsList;
