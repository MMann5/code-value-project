import styles from "./PopupWrapper.module.scss";

interface PopupWrapperProps {
  children: React.ReactNode;
}

const PopupWrapper = ({ children }: PopupWrapperProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PopupWrapper;
