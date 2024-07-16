import { useContext, useEffect } from "react";
import mainModel from "../../assets/images/main-model.png";
import styles from "./Home.module.css";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";

export const Home = () => {

  const { responseGet: responseProducts, loadingGet: loadingProducts, errorGet } = useContext(ProductsContext);

  useEffect(() => {
    console.log(responseProducts);
  }, [responseProducts])

  return (
    <div className={styles.boxHome}>
      {/* SECCIÓN DE INICIO */}
      <section className={styles.boxStart}>
        <div className={styles.boxText}>
          <p className={styles.preTitle}>—— NEW SHOP</p>
          <h1 className={styles.storeName}>STYLE HUB</h1>
          <p className={styles.storeSlogan}>WHERE STYLE MEETS ELEGANCE</p>
        </div>
        <div className={styles.boxImage}>
          <img src={mainModel} alt="" />
        </div>
      </section>

      {/* LISTA DE PRODUCTOS */}
      <section>
        {
          // loadingProducts ? (<div>Cargando :v</div>): (

          // )
        }
      </section>
    </div>
  );
};
