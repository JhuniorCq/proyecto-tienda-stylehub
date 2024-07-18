import mainModel from "../../assets/images/main-model.png";
import styles from "./Home.module.css";
import { StoreSection } from "../../components/StoreSection/StoreSection";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";

export const Home = () => {
  const {
    responseGet: responseProducts,
    loadingGet: loadingProducts,
    errorGet,
  } = useContext(ProductsContext);

  const menClothingList = responseProducts.filter((product) => product.category === "men's clothing");
  const womenClothingList = responseProducts.filter((product) => product.category === "women's clothing");

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

      {loadingProducts ? (
        <div>Cargando :v</div>
      ) : (
        <div className={styles.boxSections}>
          {/* LISTA DE PRODUCTOS DE HOMBRE */}
          <StoreSection
            productList={menClothingList}
            sectionTitle="MEN'S CLOTHING"
          />

          {/* LISTA DE PRODUCTOS DE MUJER */}
          <StoreSection
            productList={womenClothingList}
            sectionTitle="WOMEN'S CLOTHING"
          />
        </div>
      )}
    </div>
  );
};
