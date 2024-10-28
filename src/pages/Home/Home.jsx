import styles from "./Home.module.css";
import { StoreSection } from "../../components/StoreSection/StoreSection";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";
import { PRODUCT_CATEGORIES } from "../../utils/constants";
import { StartSection } from "../../components/StartSection/StartSection";
import { Loader } from "../../components/Loader/Loader";

export const Home = () => {
  const {
    responseGet: responseProducts,
    loadingGet: loadingProducts,
    errorGet,
  } = useContext(ProductsContext);

  const menClothingList = responseProducts.filter(
    (product) => product.category === PRODUCT_CATEGORIES.menClothing
  );
  const womenClothingList = responseProducts.filter(
    (product) => product.category === PRODUCT_CATEGORIES.womenClothing
  );

  return (
    <div className={styles.boxHome}>
      {/* SECCIÓN DE INICIO */}
      <StartSection />

      {loadingProducts ? (
        <Loader />
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
