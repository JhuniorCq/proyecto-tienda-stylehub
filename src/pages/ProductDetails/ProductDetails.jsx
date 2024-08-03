import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useGet } from "../../hooks/useGet";
import { URL_PRODUCTS } from "../../constants";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";
import { Loader } from "../../components/Loader/Loader";

export const ProductDetails = () => {
  const { id } = useParams();

  const { responseGet: responseProducts, loadingGet: loadingProducts, errorGet: errorProducts } = useContext(ProductsContext);

  const productData = responseProducts.find(product => product.id === Number(id));

  const {
    addShoppingCart,
  } = useContext(ShoppingCartContext);

  return loadingProducts ? (
    <Loader />
  ) : (
    <div className={styles.boxProductDetails}>
      <div className={styles.boxProduct}>
        <div className={styles.boxImage}>
          <img src={productData.image} alt={productData.title} />
        </div>
        <div className={styles.boxText}>
          <h2 className={styles.productTitle}>{productData.title}</h2>
          <p className={styles.productPrice}>$ {productData.price}</p>
          <p className={styles.productDescription}>{productData.description}</p>
          <button onClick={() => addShoppingCart(productData)} className={styles.addButton}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};
