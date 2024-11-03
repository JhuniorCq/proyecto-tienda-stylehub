import { ProductsContext } from "./ProductsContext";
import { useGet } from "../../hooks/useGet";
import { URL_SERVER } from "../../utils/constants";
import { useEffect } from "react";

export const ProductsProvider = ({ children }) => {
  // DATO: Actualmente el GET solo se ejecuta una vez, que es al MONTAR el Componente ProductsProvider y ya NO se vuelve a ejecutar (por lo que si en el backend se cambian los datos de los productos, creo que NO se verá reflejados acá porque NO se vuelve a hacer una Solicitud GET) -> Para que se vean reflejados se deberá hacer un F5 creo xd

  // CAMBIAREMOS LA FORMA DEL useGet PARA QUE SEA UN useGet FLEXIBLE A LOS DOS CASOS DE USO QUE TIENE
  const { responseGet, loadingGet, errorGet, getData } = useGet(
    `${URL_SERVER}/product`,
    true
  );

  // const fetchProducts = () => {
  //   getData(`${URL_SERVER}/product`);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

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

/*
  SOLUCIÓN PARA EL PROBLEMA COMENTADO: -> (El problema es más porque el PROVIDER solo se monta una vez, y luego ya no tiene más renderizados, por lo que el GET no se vuelve a hacer otra vez)
  1. Forzar una nueva solicitud GET después de cada compra: Después de confirmar que la compra fue exitosa, debemos volver a hacer la solicitud GET a la API de los Productos, para así obtener los Productos ACTUALIZADOS.
        - La solución es EXPORTAR de useGet a "getData", ya que con "getData" podremos volver a hacer la Solicitud GET
        - Ahora, en ProductsProvider llamamos a "useGet" y obtenemos un "getData" -> Este "getData" ya está ASOCIADO con el llamado de "useGet" en ProductsProvider, por lo que este "getData" está asociado con la URL que le pasó a este "useGet"

  La SOLUCIÓN sería llamar ala Función "refetchProducts()", en el Componente respectivo, luego de CONFIRMAR la COMPRA
*/
