import { RiDeleteBackFill } from "react-icons/ri";
import styles from "./ShoppingCartProduct.module.css";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import { roundToDecimals } from "../../utils/logic";
import { addOrRemoveProductToast } from "../../utils/notifications/toasts";

export const ShoppingCartProduct = ({ id, name, image, price, quantity }) => {
  const { removeShoppingCart, increaseProductQuantity, reduceProductQuantity } =
    useContext(ShoppingCartContext);

  const removeProduct = () => {
    removeShoppingCart(id);
    addOrRemoveProductToast({
      toast: true,
      position: "bottom-left",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: "success",
      title: "Producto removido del carrito",
    });
  };

  return (
    <div className={styles.boxProduct}>
      <div className={styles.boxImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.boxProductData}>
        <div className={styles.firstRowProductData}>
          <h2 className={styles.productName}>{name}</h2>
          <RiDeleteBackFill
            onClick={removeProduct}
            className={styles.removeProduct}
          />
        </div>
        <div className={styles.lastRowProductData}>
          <div className={styles.boxProductOptions}>
            <button onClick={() => reduceProductQuantity(id)}>-</button>
            <p className={styles.quantityProduct}>{quantity}</p>
            <button onClick={() => increaseProductQuantity(id)}>+</button>
          </div>
          <p className={styles.unitPrice}>$ {price}</p>
          <p className={styles.totalPrice}>
            $ {roundToDecimals(price * quantity, 2)}
          </p>
        </div>
      </div>
    </div>
  );
};
