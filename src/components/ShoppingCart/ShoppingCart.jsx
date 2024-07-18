import { FaArrowRight } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./ShoppingCart.module.css";
import { ShoppingCartProduct } from "../ShoppingCartProduct/ShoppingCartProduct";

export const ShoppingCart = ({ showShoppingCart, appearShoppingCart }) => {

  return (
    <div className={showShoppingCart ? styles.boxShoppingCart: `${styles.boxShoppingCart} ${styles.hideShoppingCart}`}>
      <div className={styles.boxQuantityProducts}>
        <p className={styles.quantityProducts}>SHOPPING CART {`(${0})`}</p>
        <FaArrowRight onClick={appearShoppingCart} className={styles.backButton} />
      </div>
      <div className={styles.boxProducts}>
        <ShoppingCartProduct />
        <ShoppingCartProduct />
        <ShoppingCartProduct />
        <ShoppingCartProduct />
        <ShoppingCartProduct />

      </div>
      <div className={styles.boxFinalCartResult}>
        <div>
          <p className={styles.totalCost}>TOTAL: $ 30.00</p>
          <button className={styles.deleteAllButton}>
            <FaTrashAlt />
          </button>
        </div>
        <div>
          <button className={styles.buyButton}>Buy products</button>
        </div>
      </div>
    </div>
  );
};
