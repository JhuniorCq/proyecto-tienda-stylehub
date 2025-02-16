import styles from "./Home.module.css";
import { StoreSection } from "../../components/StoreSection/StoreSection";
import { useContext, useMemo } from "react";
import { ProductsContext } from "../../context/ProductsContext/ProductsContext";
import { PRODUCT_CATEGORIES } from "../../utils/constants";
import { StartSection } from "../../components/StartSection/StartSection";
import { Loader } from "../../components/Loader/Loader";
import { CategoriesBox } from "../../components/CategoriesBox/CategoriesBox";
import categoryMensClothing from "../../assets/images/categoryMensClothing.png";
import categoryWomensClothing from "../../assets/images/categoryWomensClothing.png";
import categoryElectronics from "../../assets/images/categoryElectronics.png";
import categoryJewelry from "../../assets/images/categoryJewelry.png";
import imagePoster from "../../assets/images/imagePoster.png";
import backgroundMens from "../../assets/images/backgroundMens.png";
import backgroundWomens from "../../assets/images/backgroundWomens.png";
import backgroundElectronics from "../../assets/images/backgroundElectronics.png";
import backgroundJewelry from "../../assets/images/backgroundJewelry.png";
import { PosterBox } from "../../components/PosterBox/PosterBox";
import { Advertising } from "../../components/Advertising/Advertising";
import { Footer } from "../../components/Footer/Footer";

const categoryList = [
  {
    title: "MEN'S CLOTHING",
    image: categoryMensClothing,
  },
  {
    title: "WOMEN'S CLOTHING",
    image: categoryWomensClothing,
  },
  {
    title: "ELECTRONICS",
    image: categoryElectronics,
  },
  {
    title: "JEWELERY",
    image: categoryJewelry,
  },
];

export const Home = () => {
  const {
    responseGet: responseProducts,
    loadingGet: loadingProducts,
    errorGet: errorProducts,
  } = useContext(ProductsContext);

  const menClothingList = useMemo(() => {
    if (!responseProducts || responseProducts.length === 0) return;

    return responseProducts.filter(
      (product) => product.category === PRODUCT_CATEGORIES.menClothing
    );
  }, [responseProducts]);

  const womenClothingList = useMemo(() => {
    if (!responseProducts || responseProducts.length === 0) return;

    return responseProducts.filter(
      (product) => product.category === PRODUCT_CATEGORIES.womenClothing
    );
  }, [responseProducts]);

  const electronicsList = useMemo(() => {
    if (!responseProducts || responseProducts.length === 0) return;
    return responseProducts.filter(
      (product) => product.category === PRODUCT_CATEGORIES.electronics
    );
  }, [responseProducts]);

  const jeweleryList = useMemo(() => {
    if (!responseProducts || responseProducts.length === 0) return;
    return responseProducts.filter(
      (product) => product.category === PRODUCT_CATEGORIES.jewelery
    );
  }, [responseProducts]);

  return (
    <div className={styles.boxHome}>
      {/* SECCIÓN DE INICIO */}
      <StartSection />

      {/* CAJA DE LAS CATEGORÍAS DE PRODUCTOS */}
      <CategoriesBox categoryList={categoryList} />

      <Advertising />

      <PosterBox image={imagePoster} />

      {loadingProducts ? (
        <Loader />
      ) : errorProducts ? (
        <p className={styles.errorMessageProducts}>{errorProducts}</p>
      ) : (
        <div className={styles.boxSections}>
          {/* LISTA DE PRODUCTOS DE HOMBRE */}
          <StoreSection
            id={PRODUCT_CATEGORIES.menClothing}
            productList={menClothingList}
            sectionTitle={PRODUCT_CATEGORIES.menClothing.toUpperCase()}
            backgroundImage={backgroundMens}
          />

          {/* LISTA DE PRODUCTOS DE MUJER */}
          <StoreSection
            id={PRODUCT_CATEGORIES.womenClothing}
            productList={womenClothingList}
            sectionTitle={PRODUCT_CATEGORIES.womenClothing.toUpperCase()}
            backgroundImage={backgroundWomens}
          />

          {/* LISTA DE PRODUCTOS ELECTRÓNICOS */}
          <StoreSection
            id={PRODUCT_CATEGORIES.electronics}
            productList={electronicsList}
            sectionTitle={PRODUCT_CATEGORIES.electronics.toUpperCase()}
            backgroundImage={backgroundElectronics}
          />

          {/* LISTA DE PRODUCTOS DE JOYERÍA */}
          <StoreSection
            id={PRODUCT_CATEGORIES.jewelery}
            productList={jeweleryList}
            sectionTitle={PRODUCT_CATEGORIES.jewelery.toUpperCase()}
            backgroundImage={backgroundJewelry}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};
