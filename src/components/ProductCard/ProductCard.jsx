import styles from "./ProductCard.module.css";

export const ProductCard = ({ image, category, name, price }) => {
    return (
        <div>
            <div>
                <img src={image} alt={name} />
            </div>
            <div>
                <p>{category}</p>
                <h2>{name}</h2>
                <p>{price}</p>
            </div>
        </div>
    );
};