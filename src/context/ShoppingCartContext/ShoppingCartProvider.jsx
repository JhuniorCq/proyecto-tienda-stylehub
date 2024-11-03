import { useEffect, useReducer, useState } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { SHOPPING_CART_ACTIONS, URL_SERVER } from "../../utils/constants";
import { Toast } from "../../utils/notifications/toasts";
import { useManualGet } from "../../hooks/useManualGet";

export const ShoppingCartProvider = ({ children }) => {
  const {
    responseGet: responseShowQuantity,
    loadingGet: loadingShowQuantity,
    errorGet: errorShowQuantity,
    getData: getShowQuantity,
  } = useManualGet();

  // Estado para el ID del producto a incrementar
  const [productIdToIncrease, setProductIdToIncrease] = useState(null);

  const getCartSessionStorage = (shoppingCartInitial) => {
    const savedCart = window.sessionStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : shoppingCartInitial;
  };

  const shoppingCartReducer = (state, action) => {
    let updateState;

    switch (action.type) {
      case SHOPPING_CART_ACTIONS.addProduct: {
        if (state.some((product) => product.id === action.payload.id))
          return state;

        updateState = [...state, action.payload];
        break;
      }
      case SHOPPING_CART_ACTIONS.removeProduct: {
        updateState = state.filter((product) => product.id !== action.payload);
        break;
      }
      case SHOPPING_CART_ACTIONS.increaseProduct: {
        // Acá en vez de hacer este "find" deberíamos hacer un GET al backend, para así obtener los DATOS más ACTUALES sobre la Cantidad Disponible de este producto -> Esto debido a que esta cantidad puede ser cambiada desde el mismo front de la tienda (a través de la compra de un producto, ya que luego de esta compra se hace un POST al backend y se cambia la cantidad), o también desde el front del PANEL de GESTIÓN (en este PANEL el ADMIN puede cambiar manualmente la cantidad disponible de un producto, y este cambio NO se verá reflejado en el frontend de la TIENDA así por así) -> Por este último motivo, es que lo mejor es hacer un GET al backend para ver la cantidad disponible ACTUAL, cada vez que un COMPRADOR va AUMENTANDO la Cantidad que quiere comprar de un producto   ->    Este GET lo haríamos dentro del IF para no hacer GETs innecesarios

        const { showQuantity } = responseShowQuantity;

        console.log("XD", showQuantity, responseShowQuantity);

        updateState = state.map((product) => {
          if (product.id === action.payload) {
            if (product.quantity < showQuantity) {
              product.quantity++;
            } else {
              Toast({
                toast: true,
                position: "bottom-left",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
                title: `La cantidad límite de este producto es ${showQuantity}`,
              });
            }
          }
          return product;
        });
        break;
      }
      case SHOPPING_CART_ACTIONS.reduceProduct: {
        updateState = state.map((product) => {
          if (product.id === action.payload && product.quantity > 1) {
            product.quantity--;
          }

          return product;
        });
        break;
      }
      case SHOPPING_CART_ACTIONS.removeAllProducts: {
        updateState = [];
        break;
      }
      default: {
        return state;
      }
    }

    window.sessionStorage.setItem("shoppingCart", JSON.stringify(updateState));
    return updateState;
  };

  const [shoppingCartProducts, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    [],
    getCartSessionStorage
  );

  const addShoppingCart = (product) => {
    product.quantity = 1;

    const action = {
      type: SHOPPING_CART_ACTIONS.addProduct,
      payload: product,
    };

    shoppingCartDispatch(action);
  };

  const removeShoppingCart = (id) => {
    const action = {
      type: SHOPPING_CART_ACTIONS.removeProduct,
      payload: id,
    };

    shoppingCartDispatch(action);
  };

  const increaseProductQuantity = (id) => {
    // Inicializamos productIdToIncrease con el ID del producto a incrementar
    setProductIdToIncrease(id);
    getShowQuantity(`${URL_SERVER}/product/show-quantity/${id}`);

    // El DISPATCH se ejecutará solo cuando ya se tenga la respuesta del backend
  };

  const reduceProductQuantity = (id) => {
    const action = {
      type: SHOPPING_CART_ACTIONS.reduceProduct,
      payload: id,
    };

    shoppingCartDispatch(action);
  };

  const removeAllShoppingCart = () => {
    const action = {
      type: SHOPPING_CART_ACTIONS.removeAllProducts,
    };

    shoppingCartDispatch(action);
  };

  useEffect(() => {
    // Se ejecutará el DISPATCH cuado se tenga los datos del backend y no haya errores
    if (
      productIdToIncrease &&
      responseShowQuantity &&
      !loadingShowQuantity &&
      !errorShowQuantity
    ) {
      const action = {
        type: SHOPPING_CART_ACTIONS.increaseProduct,
        payload: productIdToIncrease,
      };

      shoppingCartDispatch(action);

      // Reseteamos el estado productIdToIncrease para que pueda usarse con otro producto a incrementar
      setProductIdToIncrease(null);
    }
  }, [responseShowQuantity, productIdToIncrease]);

  // useEffect para manejar el ERROR en la obtención de showQuantity
  useEffect(() => {
    if (errorShowQuantity) {
      alert("Error al conseguir showQuantity del backend");
    }
  }, [errorShowQuantity]);

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCartProducts,
        addShoppingCart,
        removeShoppingCart,
        increaseProductQuantity,
        reduceProductQuantity,
        removeAllShoppingCart,
        responseShowQuantity,
        loadingShowQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
