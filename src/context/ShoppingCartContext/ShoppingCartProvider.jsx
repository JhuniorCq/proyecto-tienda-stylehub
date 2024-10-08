import { useReducer } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { SHOPPING_CART_ACTIONS } from "../../utils/constants";

export const ShoppingCartProvider = ({ children }) => {
  const shoppingCartReducer = (state, action) => {
    switch (action.type) {
      case SHOPPING_CART_ACTIONS.addProduct: {
        if (state.some((product) => product.id === action.payload.id))
          return state;
        return [...state, action.payload];
      }
      case SHOPPING_CART_ACTIONS.removeProduct: {
        return state.filter((product) => product.id !== action.payload);
      }
      case SHOPPING_CART_ACTIONS.increaseProduct: {
        return state.map((product) => {
          if (product.id === action.payload) product.quantity++;
          return product;
        });
      }
      case SHOPPING_CART_ACTIONS.reduceProduct: {
        return state.map((product) => {
          if (product.id === action.payload && product.quantity > 1)
            product.quantity--;
          return product;
        });
      }
      case SHOPPING_CART_ACTIONS.removeAllProducts: {
        return [];
      }
      default: {
        return;
      }
    }
  };

  const [shoppingCartProducts, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    []
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
