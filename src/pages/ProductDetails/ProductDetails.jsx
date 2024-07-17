import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";

export const ProductDetails = () => {

    const { id } = useParams();

    return (
        <div>
            Detalles del producto N° {id}
        </div>
    );
};