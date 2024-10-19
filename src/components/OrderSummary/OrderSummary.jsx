import {
  roundToDecimals,
  totalCost,
  totalQuantityItems,
} from "../../utils/logic";
import styles from "./OrderSummary.module.css";

export const OrderSummary = ({ shoppingCartProducts }) => {
  return (
    <div className={styles.orderSummary}>
      <ul className={styles.productList}>
        {shoppingCartProducts &&
          shoppingCartProducts.map((product) => (
            <li key={product.id} className={styles.productBox}>
              <div>
                <div className={styles.imageBox}>
                  <img src={product.image} alt="" />
                  <span className={styles.quantity}>{product.quantity}</span>
                </div>
                <div className={styles.nameProductBox}>
                  <p className={styles.nameProduct}>{product.name}</p>
                </div>
              </div>
              <p className={styles.priceProduct}>S/. {product.price}</p>
            </li>
          ))}
      </ul>
      <div className={styles.productCostsBox}>
        <div className={styles.subTotalBox}>
          <div>
            <p>Subtotal ({totalQuantityItems(shoppingCartProducts)} items)</p>
            <p>S/. {roundToDecimals(totalCost(shoppingCartProducts), 2)}</p>
          </div>
          <div>
            <p>Shipping type</p>
            <p>S/. 9.00</p>
          </div>
        </div>
        <div className={styles.totalBox}>
          <div>
            <p className={styles.totalText}>TOTAL</p>
            <p className={styles.taxtText}>Incluye S/. 18.28 de impuestos</p>
          </div>
          <div>
            <p>
              <span className={styles.textPEN}>PEN</span>{" "}
              <span className={styles.totalCost}>
                S/. {roundToDecimals(totalCost(shoppingCartProducts) + 9, 2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
