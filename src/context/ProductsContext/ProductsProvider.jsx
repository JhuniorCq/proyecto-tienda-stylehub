import { ProductsContext } from "./ProductsContext";
import { useGet } from "../../hooks/useGet"
import { URL_PRODUCTS } from "../../constants";

export const ProductsProvider = ({ children }) => {
    const stateProducts = useGet(URL_PRODUCTS);

    return (
        <ProductsContext.Provider value={stateProducts}>
            {children}
        </ProductsContext.Provider>
    );
};