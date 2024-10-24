import { useReducer } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { SHOPPING_CART_ACTIONS } from "../../utils/constants";

export const ShoppingCartProvider = ({ children }) => {
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
        updateState = state.map((product) => {
          if (product.id === action.payload) product.quantity++;
          return product;
        });
        break;
      }
      case SHOPPING_CART_ACTIONS.reduceProduct: {
        updateState = state.map((product) => {
          if (product.id === action.payload && product.quantity > 1)
            product.quantity--;
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
    const action = {
      type: SHOPPING_CART_ACTIONS.increaseProduct,
      payload: id,
    };

    shoppingCartDispatch(action);
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

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCartProducts,
        addShoppingCart,
        removeShoppingCart,
        increaseProductQuantity,
        reduceProductQuantity,
        removeAllShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
