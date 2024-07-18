import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useState } from "react";

export const Navbar = () => {
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
          <p className={styles.quantityProducts}>0</p>
        </div>
      </header>

      {/* SHOPPING CART */}
      <ShoppingCart showShoppingCart={showShoppingCart} appearShoppingCart={appearShoppingCart} />
    </>
  );
};
