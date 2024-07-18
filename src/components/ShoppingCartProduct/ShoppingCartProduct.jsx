import { RiDeleteBackFill } from "react-icons/ri";
import styles from "./ShoppingCartProduct.module.css";

export const ShoppingCartProduct = () => {
  return (
    <div className={styles.boxProduct}>
      <div className={styles.boxImage}>
        <img src="" alt="Imagen" />
      </div>
      <div className={styles.boxProductData}>
        <div className={styles.firstRowProductData}>
          <h2 className={styles.productName}>Nombre Producto</h2>
          <RiDeleteBackFill className={styles.removeProduct} />
        </div>
        <div className={styles.lastRowProductData}>
          <div className={styles.boxProductOptions}>
            <button>-</button>
            <p className={styles.quantityProduct}>1</p>
            <button>+</button>
          </div>
          <p className={styles.unitPrice}>$ 10.00</p>
          <p className={styles.totalPrice}>$ 20.00</p>
        </div>
      </div>
    </div>
  );
};
