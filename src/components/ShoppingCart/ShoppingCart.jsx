import { FaArrowRight } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./ShoppingCart.module.css";
import { ShoppingCartProduct } from "../ShoppingCartProduct/ShoppingCartProduct";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";

export const ShoppingCart = ({ showShoppingCart, appearShoppingCart }) => {
  const {
    shoppingCartProducts,
    addShoppingCart,
    removeShoppingCart,
    increaseProductQuantity,
    reduceProductQuantity,
    removeAllShoppingCart
  } = useContext(ShoppingCartContext);

  const totalQuantityItems = shoppingCartProducts.reduce((accumulator, product) => product.quantity + accumulator, 0);
  const totalCost = shoppingCartProducts.reduce((accumulator, product) => (product.quantity * product.price) + accumulator , 0);

  return (
    <div
      className={
        showShoppingCart
          ? styles.boxShoppingCart
          : `${styles.boxShoppingCart} ${styles.hideShoppingCart}`
      }
    >
      <div className={styles.boxQuantityProducts}>
        <p className={styles.quantityProducts}>SHOPPING CART {`(${totalQuantityItems})`}</p>
        <FaArrowRight
          onClick={appearShoppingCart}
          className={styles.backButton}
        />
      </div>
      <div className={styles.boxProducts}>
        {
          shoppingCartProducts && shoppingCartProducts.map(product => (
            <ShoppingCartProduct 
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
            />
          ))
        }
      </div>
      <div className={styles.boxFinalCartResult}>
        <div>
          <p className={styles.totalCost}>TOTAL: $ {totalCost}</p>
          <button className={styles.deleteAllButton}>
            <FaTrashAlt onClick={removeAllShoppingCart} />
          </button>
        </div>
        <div>
          <button className={styles.buyButton}>Buy products</button>
        </div>
      </div>
    </div>
  );
};
