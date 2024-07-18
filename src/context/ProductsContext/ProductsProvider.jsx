import { ProductsContext } from "./ProductsContext";
import { useGet } from "../../hooks/useGet"
import { URL_MEN_CLOTHING, URL_PRODUCTS, URL_WOMEN_CLOTHING } from "../../constants";

export const ProductsProvider = ({ children }) => {

    const stateGetMen = useGet(URL_MEN_CLOTHING);
    const stateGetWoman = useGet(URL_WOMEN_CLOTHING);
    const stateProducts = useGet(URL_PRODUCTS);

    return (
        <ProductsContext.Provider value={stateProducts}>
            {children}
        </ProductsContext.Provider>
    );
};