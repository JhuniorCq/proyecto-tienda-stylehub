import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useGet } from "../../hooks/useGet";
import { URL_PRODUCTS } from "../../constants";

export const ProductDetails = () => {
  const { id } = useParams();
  const {
    responseGet: productData,
    loadingGet,
    errorGet,
  } = useGet(`${URL_PRODUCTS}/${id}`);

  return loadingGet ? (
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
          <button className={styles.addButton}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};
