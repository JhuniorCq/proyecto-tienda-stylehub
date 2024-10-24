import { useContext } from "react";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import styles from "./OrderCompletion.module.css";
// import { FaRegCircleCheck } from "react-icons/fa6";
import { BsCartCheck } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "../Checkout/constants";
import { roundToDecimals, totalCost } from "../../utils/logic";
import { DELIVERY_COST } from "../../utils/constants";

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
          {/* <div>
            <img src="" alt="" />
          </div> */}
          <div className={styles.orderReserverdDataBox}>
            <h2>Tu pedido ya ha sido reservado</h2>
            <p>
              Deberás realizar el pago de tu pedido en la siguientes 24 o 48
              horas como máximo, de lo contrario tu pedido será cancelado.
            </p>

            <div className={styles.paymentMethodDataBox}>
              {orderData.paymentOption === PAYMENT_OPTIONS[1].text ? (
                <>
                  <h3>Número de Yape</h3>
                  <p>936128801</p>
                </>
              ) : orderData.paymentOption === PAYMENT_OPTIONS[2].text ? (
                <>
                  <h3>Cuenta BCP</h3>
                  <p>Cuenta: 191-9876543-2-10</p>
                  <p>CCI: 00112233445566778899</p>
                  <p>A nombre de: Style Hub S.A.C.</p>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className={styles.orderDetailsBox}>
          <h2>Detalles del pedido</h2>
          <div className={styles.orderDetailsDataBox}>
            <div>
              <div className={styles.sectionOrderDetails}>
                <h3>Información de contacto</h3>
                <p>{orderData.firstName}</p>
                <p>{orderData.lastName}</p>
                <p>{orderData.dni}</p>
                <p>{orderData.email}</p>
                <p>{orderData.cellPhone}</p>
              </div>

              <div className={styles.sectionOrderDetails}>
                <h3>Tipo de Entrega</h3>
                <p>{orderData.deliveryOption}</p>
              </div>
            </div>

            <div>
              {/* Si el tipo de envío es por domicilio se mostrará el siguiente <div> */}
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
                <h3>Método de Pago</h3>
                <p>
                  {orderData.paymentOption}: S/.{" "}
                  {orderData.deliveryOption === DELIVERY_OPTIONS[0].text
                    ? roundToDecimals(totalCost(shoppingCartProducts), 2) +
                      DELIVERY_COST
                    : orderData.deliveryOption === DELIVERY_OPTIONS[1].text
                    ? roundToDecimals(totalCost(shoppingCartProducts), 2)
                    : null}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.finalOptionsBox}>
          <Link to="/" className={styles.helpLink}>
            ¿Necesitas ayuda?, ponte en contacto con nosotros.
          </Link>

          <Link
            to="/"
            className={styles.backButton}
            onClick={removeAllShoppingCart}
          >
            Regresar a la tienda
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
