import { RiDeleteBackFill } from "react-icons/ri";
import styles from "./ShoppingCartProduct.module.css";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";

export const ShoppingCartProduct = ({ id, name, image, price, quantity }) => {

  const {
    shoppingCartProducts,
    addShoppingCart,
    removeShoppingCart,
    increaseProductQuantity,
    reduceProductQuantity,
  } = useContext(ShoppingCartContext);

  return (
    <div className={styles.boxProduct}>
      <div className={styles.boxImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.boxProductData}>
        <div className={styles.firstRowProductData}>
          <h2 className={styles.productName}>{name}</h2>
          <RiDeleteBackFill onClick={() => removeShoppingCart(id)} className={styles.removeProduct} />
        </div>
        <div className={styles.lastRowProductData}>
          <div className={styles.boxProductOptions}>
            <button onClick={() => reduceProductQuantity(id)} >-</button>
            <p className={styles.quantityProduct}>{quantity}</p>
            <button onClick={() => increaseProductQuantity(id)}>+</button>
          </div>
          <p className={styles.unitPrice}>$ {price}</p>
          <p className={styles.totalPrice}>$ {price * quantity}</p>
        </div>
      </div>
    </div>
  );
};
