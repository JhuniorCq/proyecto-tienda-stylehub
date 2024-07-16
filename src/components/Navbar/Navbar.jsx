import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/"><img src={logo} alt="Logo" /></Link>
            <AiOutlineShopping className={styles.shoppingCart} />
        </header>
    );
};