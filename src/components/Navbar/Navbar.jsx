import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import { PRODUCT_CATEGORIES } from "../../utils/constants";

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
          <header>
            <nav className={styles.navBar}>
              <Link className={styles.logo} to="/">
                <img src={logo} alt="Logo" />
              </Link>

              <ul className={styles.categoryList}>
                <li>
                  <a
                    href={`#${PRODUCT_CATEGORIES.menClothing}`}
                    className={styles.category}
                  >
                    Men's
                  </a>
                  {/* <NavLink
                    className={`${styles.category} ${({ isActive }) => {
                      isActive ? styles.activeCategory : "";
                    }}`}
                  >
                    Men's
                  </NavLink> */}
                </li>
                <li>
                  <a
                    href={`#${PRODUCT_CATEGORIES.womenClothing}`}
                    className={styles.category}
                  >
                    Women's
                  </a>
                  {/* <NavLink
                    className={`${styles.category} ${({ isActive }) => {
                      isActive ? styles.activeCategory : "";
                    }}`}
                  >
                    Women's
                  </NavLink> */}
                </li>
                <li>
                  <a
                    href={`#${PRODUCT_CATEGORIES.electronics}`}
                    className={styles.category}
                  >
                    Electronics
                  </a>
                  {/* <NavLink
                    className={`${styles.category} ${({ isActive }) => {
                      isActive ? styles.activeCategory : "";
                    }}`}
                  >
                    Electronics
                  </NavLink> */}
                </li>
                <li>
                  <a
                    href={`#${PRODUCT_CATEGORIES.jewelery}`}
                    className={styles.category}
                  >
                    Jawelery
                  </a>
                  {/* <NavLink
                    className={`${styles.category} ${({ isActive }) => {
                      isActive ? styles.activeCategory : "";
                    }}`}
                  >
                    Jawelery
                  </NavLink> */}
                </li>
              </ul>

              <div className={styles.boxNavOptions}>
                <div className={styles.boxSearchIcon}>
                  <LuSearch className={styles.searchIcon} />
                </div>
                <div
                  className={styles.boxShoppingCart}
                  onClick={appearShoppingCart}
                >
                  <AiOutlineShopping className={styles.shoppingCart} />
                  <p className={styles.quantityProducts}>
                    {shoppingCartProducts.length}
                  </p>
                </div>
              </div>
            </nav>
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
