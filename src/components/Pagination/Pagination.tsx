import React from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showPrevNext?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  currentPage,
  totalPages,
  onPageChange,
  showPrevNext = true,
  className = "",
}) => {
  const handlePrevPage = () => {
    console.log("Prev page clicked, current:", currentPage);
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    console.log(
      "Next page clicked, current:",
      currentPage,
      "total:",
      totalPages
    );
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`${styles.pagination} ${className}`}>
      {showPrevNext && (
        <button
          className={`${styles.navButton} ${styles.prevButton} ${
            isPrevDisabled ? styles.disabled : ""
          }`}
          onClick={handlePrevPage}
          disabled={isPrevDisabled}
        >
          <span className={styles.chevron}>‹</span>
          <span className={styles.buttonText}>Prev Page</span>
        </button>
      )}

      <div className={styles.pageInfo}>
        <span className={styles.currentPage}>{currentPage}</span>
        <span className={styles.separator}>of</span>
        <span className={styles.totalPages}>{totalPages}</span>
      </div>

      {showPrevNext && (
        <button
          className={`${styles.navButton} ${styles.nextButton} ${
            isNextDisabled ? styles.disabled : ""
          }`}
          onClick={handleNextPage}
          disabled={isNextDisabled}
        >
          <span className={styles.buttonText}>Next Page</span>
          <span className={styles.chevron}>›</span>
        </button>
      )}
    </div>
  );
};

export default Pagination;
