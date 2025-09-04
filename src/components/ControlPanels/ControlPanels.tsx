import { IoMdAdd } from "react-icons/io";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import styles from "./ControlPanels.module.scss";

const ControlPanels = () => {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "name", label: "Name" },
    { value: "price", label: "Price" },
    { value: "recent", label: "Recently Added" },
    { value: "oldest", label: "Oldest Added" },
  ];

  return (
    <div className={styles.container}>
      <Button variant="primary" size="medium">
        <IoMdAdd />
        Add Product
      </Button>
      <Input
        type="text"
        placeholder="Search Product"
        variant="default"
        size="medium"
      />
      <div className={styles.sortBy}>
        <p>Sort by : </p>
        <Select
          options={filterOptions}
          placeholder="Sort by..."
          variant="default"
          size="medium"
        />
      </div>
    </div>
  );
};

export default ControlPanels;
