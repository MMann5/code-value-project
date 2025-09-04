import styles from "./Header.module.scss";
import logo from "../../assets/product.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <h1 className={styles.title}>Mike's Store</h1>
    </header>
  );
};

export default Header;
