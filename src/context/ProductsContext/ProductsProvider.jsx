import { ProductsContext } from "./ProductsContext";
import { useGet } from "../../hooks/useGet"
import { URL_MEN_CLOTHING, URL_OF_ALL_PRODUCTS, URL_WOMEN_CLOTHING } from "../../constants";

export const ProductsProvider = ({ children }) => {

    // const { responseGet: resMenClothing, loadingGet: loadingMenClothing, errorGet: errorMenClothing } = useGet(URL_MEN_CLOTHING);
    // const { responseGet: responseWomenClothing, loadingGet: loadingWomenClothing, errorGet: errorWomenClothing } = useGet(URL_WOMEN_CLOTHING);

    const stateGetMen = useGet(URL_MEN_CLOTHING);
    const stateGetWoman = useGet(URL_WOMEN_CLOTHING);

    // const object = {

    // }

    return (
        <ProductsContext.Provider value={{ stateGetMen, stateGetWoman }}>
            {children}
        </ProductsContext.Provider>
    );
};