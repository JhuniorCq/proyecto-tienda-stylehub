import styles from "./ProductCard.module.css";

export const ProductCard = ({ image, category, name, price }) => {
    return (
        <div className={styles.boxProduct}>
            <div className={styles.boxImage}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.boxText}>
                <p className={styles.productCategory}>{category}</p>
                <h2 className={styles.productName}>{name}</h2>
                <p className={styles.productPrice}>$ {price}</p>
            </div>
        </div>
    );
};