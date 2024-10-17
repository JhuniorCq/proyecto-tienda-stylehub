// URL DEL TOTAL DE PRODUCTOS
export const URL_PRODUCTS = "https://fakestoreapi.com/products";

// URL -> ROPA DE HOMBRE
export const URL_MEN_CLOTHING =
  "https://fakestoreapi.com/products/category/men's%20clothing";

// URL -> ROPA DE MUJER
export const URL_WOMEN_CLOTHING =
  "https://fakestoreapi.com/products/category/women's%20clothing";

// CATEGORÍAS DE LOS PRODUCTOS
export const PRODUCT_CATEGORIES = {
  electronics: "electronics",
  jewelery: "jewelery",
  menClothing: "men's clothing",
  womenClothing: "women's clothing",
};

// ACCIONES QUE MODIFICAN EL ESTADO DEL CARRITO
export const SHOPPING_CART_ACTIONS = {
  addProduct: "ADD_PRODUCT",
  removeProduct: "REMOVE_PRODUCT",
  increaseProduct: "INCREASE_PRODUCT",
  reduceProduct: "REDUCE_PRODUCT",
  removeAllProducts: "REMOVE_ALL_PRODUCTS",
};

// NAMES DE LOS INPUTS
export const INPUT_NAMES = {
  EMAIL: "email",
  DELIVERY_OPTION: "deliveryOption",
  COUNTRY: "country",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  DNI: "dni",
  ADDRESS: "address",
  DEPARTMENT: "department",
  PROVINCE: "province",
  DISTRICT: "district",
  CELL_PHONE: "cellPhone",
  PAYMENT_OPTION: "paymentOption",
};

// VALOR POR DEFECTO PARA LA PRIMERA OPCIÓN DE UN SELECT
export const DEFAULT_SELECT_VALUE = "notValid";

// ESTADOS DE VALIDACIÓN DE UN INPUT / SELECT
export const INPUT_STATES = {
  INITIAL: "Initial",
  SUCCESS: "Success",
  ERROR: "Error",
};

// CREAR UN OBJETO PARA COLOCAR EL PRECIO DE DELIVERY POR ZONA (DEPARTAMENTO, PROVINCIA, DISTRITO)
