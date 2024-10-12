import { IoArrowRedoOutline } from "react-icons/io5";
import { LuStore } from "react-icons/lu";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { TbTruck } from "react-icons/tb";

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
