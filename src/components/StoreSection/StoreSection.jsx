import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./StoreSection.module.css";

export const StoreSection = ({ stateGet, sectionTitle }) => {
  const {
    responseGet: resMenClothing,
    loadingGet: loadingMenClothing,
    errorGet: errorMenClothing,
  } = stateGet;

  return (
    <div className={styles.boxStoreSection}>
      <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
      <div className={styles.boxProducts}>
        {loadingMenClothing ? (
          <div>Cargando :v</div>
        ) : (
          resMenClothing.map((product) => (
            <ProductCard
              key={product.id}
              category={product.category}
              image={product.image}
              name={product.title}
              price={product.price}
            />
          ))
        )}
      </div>
    </div>
  );
};
