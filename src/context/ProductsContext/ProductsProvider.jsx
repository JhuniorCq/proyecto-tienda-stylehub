import { ProductsContext } from "./ProductsContext";
import { useGet } from "../../hooks/useGet"
import { URL_OF_ALL_PRODUCTS } from "../../constants";

export const ProductsProvider = ({ children }) => {

    const { responseGet, loadingGet, errorGet } = useGet(URL_OF_ALL_PRODUCTS);

    return (
        <ProductsContext.Provider value={{ responseGet, loadingGet, errorGet }}>
            {children}
        </ProductsContext.Provider>
    );
};