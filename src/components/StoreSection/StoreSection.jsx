import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./StoreSection.module.css";

export const StoreSection = ({ productList, sectionTitle }) => {
  return (
    <div className={styles.boxStoreSection}>
      <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
      <div className={styles.boxProducts}>
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.category}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};
