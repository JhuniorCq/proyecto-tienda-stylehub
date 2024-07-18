import { ShoppingCartContext } from "./ShoppingCartContext";

export const ShoppingCartProvider = ({ children }) => {
  

  return (
    <ShoppingCartContext.Provider value={null}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
