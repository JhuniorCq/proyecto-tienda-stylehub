import { useContext } from "react";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import styles from "./OrderCompletion.module.css";
import { BsCartCheck } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "../Checkout/constants";
import { roundToDecimals, totalCost } from "../../utils/logic";
import { SHIPPING_COST } from "../../utils/constants";

export const OrderCompletion = () => {
  const { shoppingCartProducts, removeAllShoppingCart } =
    useContext(ShoppingCartContext);
  const { state: orderData } = useLocation();
  console.log("xD", orderData);
  return (
    <div className={styles.orderCompletionBox}>
      <div className={styles.orderCompletionDataBox}>
        <h1 className={styles.storeName}>STYLE HUB</h1>

        <div className={styles.thankyouBox}>
          <BsCartCheck className={styles.checkIcon} />
          <p>¡Gracias, {orderData.firstName}!</p>
        </div>

        <div className={styles.orderReservedBox}>
          {/* Acá el título tal vez cambia cuando el Pago es por Paypal */}
          <h2>Your order has already been reserved</h2>
          <p>
            You must make the payment for your order within the next 24 or 48
            hours at the latest, otherwise your order will be cancelled.
          </p>

          <div className={styles.paymentMethodDataBox}>
            {orderData.paymentOption === PAYMENT_OPTIONS[1].text ? (
              <>
                <h3>Yape number</h3>
                <p>936128801</p>
              </>
            ) : orderData.paymentOption === PAYMENT_OPTIONS[2].text ? (
              <>
                <h3>BCP account</h3>
                <p>Account: 191-9876543-2-10</p>
                <p>CCI: 00112233445566778899</p>
                <p>In the name of: Style Hub S.A.C.</p>
              </>
            ) : null}
          </div>
        </div>

        <div className={styles.orderDetailsBox}>
          <h2>Order details</h2>
          <div className={styles.orderDetailsDataBox}>
            <div>
              <div className={styles.sectionOrderDetails}>
                <h3>Contact information</h3>
                <p>{orderData.firstName}</p>
                <p>{orderData.lastName}</p>
                <p>{orderData.dni}</p>
                <p>{orderData.email}</p>
                <p>{orderData.cellPhone}</p>
              </div>

              <div className={styles.sectionOrderDetails}>
                <h3>Delivery Type</h3>
                <p>{orderData.deliveryOption}</p>
              </div>
            </div>

            <div>
              {orderData.deliveryOption === DELIVERY_OPTIONS[0].text && (
                <div className={styles.sectionOrderDetails}>
                  <h3>Dirección de envío</h3>
                  <p>{orderData.country}</p>
                  <p>{orderData.department}</p>
                  <p>{orderData.province}</p>
                  <p>{orderData.district}</p>
                </div>
              )}

              <div className={styles.sectionOrderDetails}>
                <h3>Payment Method</h3>
                <p>
                  {orderData.paymentOption}: S/.{" "}
                  {orderData.deliveryOption === DELIVERY_OPTIONS[0].text
                    ? roundToDecimals(totalCost(shoppingCartProducts), 2) +
                      SHIPPING_COST
                    : orderData.deliveryOption === DELIVERY_OPTIONS[1].text
                    ? roundToDecimals(totalCost(shoppingCartProducts), 2)
                    : null}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.finalOptionsBox}>
          <Link
            to="https://wa.me/936128801"
            target="_blank"
            className={styles.helpLink}
          >
            Do you need help? Please contact us.
          </Link>

          <Link
            to="/"
            className={styles.backButton}
            onClick={removeAllShoppingCart}
          >
            Return to the store
          </Link>
        </div>
      </div>
      <div className={styles.orderSummaryBox}>
        <OrderSummary
          shoppingCartProducts={shoppingCartProducts}
          orderData={orderData}
        />
      </div>
    </div>
  );
};
