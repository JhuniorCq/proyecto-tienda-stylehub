import { ProductsContext } from "./ProductsContext";
import { useGet } from "../../hooks/useGet";
import { URL_SERVER } from "../../utils/constants";
import { useEffect } from "react";

export const ProductsProvider = ({ children }) => {
  const { responseGet, loadingGet, errorGet, getData } = useGet(
    `${URL_SERVER}/product`,
    true
  );

  console.log("Lista de Productos de la API: ", responseGet);

  return (
    <ProductsContext.Provider
      value={{
        responseGet,
        loadingGet,
        errorGet,
        refetchProducts: getData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
