import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ id, image, category, name, price }) => {
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  const saludar = () => {
    console.log("Hola :v");
  };

  return (
    <div
      className={styles.boxProduct}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={styles.boxImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.boxText}>
        <p className={styles.productCategory}>{category}</p>
        <h2 className={styles.productName}>{name}</h2>
        <p className={styles.productPrice}>$ {price}</p>
      </div>

      <div
        className={
          showOptions
            ? styles.boxOptions
            : `${styles.boxOptions} ${styles.hideBox}`
        }
      >
        <button
          className={`${styles.addButton} ${styles.optionButton}`}
          onClick={saludar}
        >
          <IoMdAdd />
        </button>
        <button
          className={`${styles.detailsButton} ${styles.optionButton}`}
          onClick={() => navigate(`/product/${id}`)}
        >
          <FaEye />
        </button>
      </div>
    </div>
  );
};
