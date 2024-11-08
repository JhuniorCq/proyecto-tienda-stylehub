import axios from "axios";
import { useEffect, useState } from "react";

export const useGet = (url) => {
  const [stateGet, setStateGet] = useState({
    responseGet: [],
    loadingGet: true,
    errorGet: null,
  });

  const getData = async () => {
    // Este setStateGet está acá, por si volvemos a ejecutar el getData (en cualquier otro momento)
    // Por ejemplo: Luego de la confirmación de la compra ejecutamos de nuevo este getData para que
    // se actualice el la Lista de Productos de la Tienda
    setStateGet((prev) => ({ ...prev, loadingGet: true }));
    try {
      const { data } = await axios.get(url);
      console.log("getData en ejecución");
      setStateGet({
        responseGet: data,
        loadingGet: false,
        errorGet: null,
      });
    } catch (error) {
      setStateGet({
        responseGet: null,
        loadingGet: false,
        errorGet: error.message,
      });
      console.error("Error en getData: ", error.message);
    }
  };

  useEffect(() => {
    if (!url) return;

    getData();
  }, [url]);

  return {
    ...stateGet,
    getData,
  };
};

// export const useGet = (url, getOnStart = true) => {
//   const [stateGet, setStateGet] = useState({
//     responseGet: [],
//     loadingGet: getOnStart,
//     errorGet: null,
//   });

//   const getData = async () => {
//     if (!url) return;

//     // Este setStateGet está acá, por si volvemos a ejecutar el getData (en cualquier otro momento)
//     // Por ejemplo: Luego de la confirmación de la compra ejecutamos de nuevo este getData para que
//     // se actualice el la Lista de Productos de la Tienda
//     setStateGet((prev) => ({ ...prev, loadingGet: true }));
//     try {
//       const { data } = await axios.get(url);

//       setStateGet({
//         responseGet: data,
//         loadingGet: false,
//         errorGet: null,
//       });
//     } catch (error) {
//       setStateGet({
//         responseGet: null,
//         loadingGet: false,
//         errorGet: error.message,
//       });
//       console.error("Error en getData: ", error.message);
//     }
//   };

//   useEffect(() => {
//     if (getOnStart) {
//       getData();
//     }
//   }, [getOnStart, url]);

//   return {
//     ...stateGet,
//     getData,
//   };
// };

// ***************************************

// export const useGet = () => {
//   const [stateGet, setStateGet] = useState({
//     responseGet: [],
//     loadingGet: false,
//     errorGet: null,
//   });

//   const getData = async (url) => {
//     if (!url) return;

//     // Este setStateGet está acá, por si volvemos a ejecutar el getData (en cualquier otro momento)
//     // Por ejemplo: Luego de la confirmación de la compra ejecutamos de nuevo este getData para que
//     // se actualice el la Lista de Productos de la Tienda
//     setStateGet({ ...stateGet, loadingGet: true }); // Es mejor la otra forma con el Estado Previo
//     try {
//       const { data } = await axios.get(url);

//       setStateGet({
//         responseGet: data,
//         loadingGet: false,
//         errorGet: null,
//       });
//     } catch (error) {
//       setStateGet({
//         responseGet: null,
//         loadingGet: false,
//         errorGet: error.message,
//       });
//       console.error("", error.message);
//     }
//   };

//   return { ...stateGet, getData };
// };
