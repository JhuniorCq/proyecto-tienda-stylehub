import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useGet } from "../../hooks/useGet";
import { URL_PRODUCTS } from "../../constants";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";

export const ProductDetails = () => {
  const { id } = useParams();

  const { responseGet: responseProducts, loadingGet: loadingProducts, errorGet: errorProducts } = useContext(ProductsContext);

  const productData = responseProducts.find(product => product.id === Number(id));

  const {
    shoppingCartProducts,
    addShoppingCart,
    removeShoppingCart,
    increaseProductQuantity,
    reduceProductQuantity,
    removeAllShoppingCart
  } = useContext(ShoppingCartContext);

  return loadingProducts ? (
    <div>Cargando :v</div>
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
