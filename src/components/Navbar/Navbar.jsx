import { Link, useLocation } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";

export const Navbar = () => {
  const { shoppingCartProducts } = useContext(ShoppingCartContext);
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  const location = useLocation();
  const [isStart, setIsStart] = useState(true);

  const appearShoppingCart = () => {
    setShowShoppingCart(!showShoppingCart);
  };

  useEffect(() => {
    if (location.pathname !== "/") setIsStart(false);
    else setIsStart(true);
  }, [location.pathname]);

  return (
    <>
      {!(
        location.pathname === "/order-completion" ||
        location.pathname === "/checkout"
      ) && (
        <>
          <header
            className={
              isStart
                ? `${styles.header} ${styles.startBackgroundColor}`
                : `${styles.header}`
            }
          >
            <Link className={styles.logo} to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <div className={styles.boxShoppingCart}>
              <AiOutlineShopping
                onClick={appearShoppingCart}
                className={styles.shoppingCart}
              />
              <p className={styles.quantityProducts}>
                {shoppingCartProducts.length}
              </p>
            </div>
          </header>

          <ShoppingCart
            showShoppingCart={showShoppingCart}
            appearShoppingCart={appearShoppingCart}
          />
        </>
      )}
    </>
  );
};
