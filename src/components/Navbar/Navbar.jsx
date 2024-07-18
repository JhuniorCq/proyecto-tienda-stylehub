import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";

export const Navbar = () => {
  const {
    shoppingCartProducts,
    addShoppingCart,
    removeShoppingCart,
    increaseProductQuantity,
    reduceProductQuantity,
  } = useContext(ShoppingCartContext);
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const appearShoppingCart = () => {
    setShowShoppingCart(!showShoppingCart);
  };

  return (
    <>
      <header className={styles.header}>
        <Link className={styles.logo} to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className={styles.boxShoppingCart}>
          <AiOutlineShopping onClick={appearShoppingCart} className={styles.shoppingCart} />
          <p className={styles.quantityProducts}>{shoppingCartProducts.length}</p>
        </div>
      </header>

      {/* SHOPPING CART */}
      <ShoppingCart showShoppingCart={showShoppingCart} appearShoppingCart={appearShoppingCart} />
    </>
  );
};
