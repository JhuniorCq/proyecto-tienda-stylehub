import styles from "./Checkout.module.css";
import { OptionsBox } from "../../components/OptionsBox/OptionsBox";
import { useContext, useEffect, useState } from "react";
import { validateCheckout } from "../../utils/validations/checkoutValidations";
import { checkoutValidationsModal } from "../../utils/notifications/modals";
import { DEFAULT_SELECT_VALUE, INPUT_NAMES } from "../../utils/constants";
import { InputCheckout } from "../../components/InputCheckout/InputCheckout";
import { ShoppingCartContext } from "../../context/ShoppingCartContext/ShoppingCartContext";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { useNavigate } from "react-router-dom";
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "./constants";
import paypalImage from "../../assets/images/paypal.png";
import Swal from "sweetalert2";
import { usePost } from "../../hooks/usePost";
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";
import { MdEmail } from "react-icons/md";

export const Checkout = () => {
  const { postData, responsePost, loadingPost, errorPost } = usePost();
  const { shoppingCartProducts } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const [checkoutForm, setCheckoutForm] = useState({
    [INPUT_NAMES.EMAIL]: null,
    [INPUT_NAMES.DELIVERY_OPTION]: DELIVERY_OPTIONS[0].text,
    [INPUT_NAMES.COUNTRY]: null,
    [INPUT_NAMES.FIRST_NAME]: null,
    [INPUT_NAMES.LAST_NAME]: null,
    [INPUT_NAMES.DNI]: null,
    [INPUT_NAMES.ADDRESS]: null,
    [INPUT_NAMES.DEPARTMENT]: null,
    [INPUT_NAMES.PROVINCE]: null,
    [INPUT_NAMES.DISTRICT]: null,
    [INPUT_NAMES.CELL_PHONE]: null,
    [INPUT_NAMES.PAYMENT_OPTION]: PAYMENT_OPTIONS[0].text,
  });

  const changeDeliveryTypeSelection = () => {
    // CUANDO HACEMOS ESTE CAMBIO, TAMBIEN DEBEMOS RESETEAR A country, department, province y district
    setCheckoutForm((prev) => ({
      ...prev,
      [INPUT_NAMES.COUNTRY]: null,
      [INPUT_NAMES.ADDRESS]: null,
      [INPUT_NAMES.DEPARTMENT]: null,
      [INPUT_NAMES.PROVINCE]: null,
      [INPUT_NAMES.DISTRICT]: null,
    }));
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    console.log(name, ":", value);
    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendForm = async (event) => {
    event.preventDefault();

    console.log("Se validarán estos datos: ", checkoutForm);
    // Validations
    const checkoutValidated = validateCheckout(
      checkoutForm,
      checkoutForm[INPUT_NAMES.DELIVERY_OPTION]
    );

    if (!checkoutValidated.success) {
      checkoutValidated.error.issues.forEach((error) =>
        console.log(error.message)
      );

      // PARA ESTA VALIDACIÓN TOTAL -> HACER OPCIONAL A COUNTRY, ADDRESS, DEPARTMENT, PROVINCE Y DISTRICT, YA QUE SOLO EXISTIRÁN SI ES QUE EL TIPO DE ENVÍO ES "SHIPPING"
      checkoutValidationsModal({
        title: "Error en el ingreso de datos",
        text: "Porfavor, complete correctamente todos los campos.",
        icon: "warning",
        confirmButtonColor: "black",
      });

      console.log("Datos validados que tienen error: ", checkoutForm);

      return;
    }

    setCheckoutForm(checkoutValidated.data);
    console.log("Enviando: ", checkoutValidated.data);

    if (checkoutForm[INPUT_NAMES.PAYMENT_OPTION] === PAYMENT_OPTIONS[0].text) {
      try {
        await handleOnlinePayment();
      } catch (error) {
        console.error("", error.message);
      }
    } else {
      // Enviamos al backend a -> checkoutValidated.data -> El backend lo almacena y nos devuelve una respuesta con los mismos datos, y esto lo mostraremos en /order-completion, pero como aún no hay backend -> Lo que haré será enviar al checkoutValidated.data como un PAYMENT en el 2do Argumento del navigate
      navigate("/order-completion", { state: checkoutValidated.data });
    }
  };

  const handleOnlinePayment = async () => {
    try {
      console.log(shoppingCartProducts);

      await postData("http://localhost:1238/payment/create-order", {
        productList: shoppingCartProducts,
        checkoutData: checkoutForm,
      });
    } catch (error) {
      console.error("", error.message);
    }
  };

  useEffect(() => {
    console.log(loadingPost);
    console.log(responsePost);
    if (!loadingPost && responsePost && responsePost.length !== 0) {
      console.log(responsePost);
      window.location.href = responsePost.links[1].href;
    }
  }, [responsePost]);

  return loadingPost ? (
    <Loader />
  ) : (
    <div className={styles.checkoutBox}>
      <div className={styles.orderFormBox}>
        <form className={styles.orderForm} onSubmit={sendForm}>
          {/* Contact */}
          <section className={styles.conctactBox}>
            <h2 className={styles.sectionTitle}>Contact</h2>

            <InputCheckout
              placeholder="Email"
              name={INPUT_NAMES.EMAIL}
              handleInput={handleInput}
              messageCompleteInput="Please enter a valid email address."
            />

            <div className={styles.namesBox}>
              <InputCheckout
                placeholder="First name"
                name={INPUT_NAMES.FIRST_NAME}
                handleInput={handleInput}
              />
              <InputCheckout
                placeholder="Last name"
                name={INPUT_NAMES.LAST_NAME}
                handleInput={handleInput}
              />
            </div>

            <InputCheckout
              placeholder="DNI"
              name={INPUT_NAMES.DNI}
              handleInput={handleInput}
            />

            <InputCheckout
              placeholder="Cell phone"
              name={INPUT_NAMES.CELL_PHONE}
              handleInput={handleInput}
            />
          </section>
          {/* Delivery */} {/* USAR AL selectDelivery */}
          <section className={styles.deliveryBox}>
            <h2 className={styles.sectionTitle}>Delivery</h2>

            <OptionsBox
              name={INPUT_NAMES.DELIVERY_OPTION}
              dataOptions={DELIVERY_OPTIONS}
              onChange={handleInput}
              defaultOption={DELIVERY_OPTIONS[0].text}
              changeDeliveryTypeSelection={changeDeliveryTypeSelection}
            />

            {checkoutForm[INPUT_NAMES.DELIVERY_OPTION] ===
            DELIVERY_OPTIONS[0].text ? (
              <>
                <InputCheckout
                  name={INPUT_NAMES.COUNTRY}
                  handleInput={handleInput}
                  isSelect={true}
                >
                  <option value={DEFAULT_SELECT_VALUE}>Select a country</option>
                  <option value="Perú">Perú</option>
                </InputCheckout>
                <InputCheckout
                  placeholder="Address"
                  name={INPUT_NAMES.ADDRESS}
                  handleInput={handleInput}
                />
                <div className={styles.locationsBox}>
                  <InputCheckout
                    name={INPUT_NAMES.DEPARTMENT}
                    handleInput={handleInput}
                    isSelect={true}
                  >
                    <option value={DEFAULT_SELECT_VALUE}>
                      Select a department
                    </option>
                    <option value="Lima">Lima</option>
                  </InputCheckout>

                  <InputCheckout
                    name={INPUT_NAMES.PROVINCE}
                    handleInput={handleInput}
                    isSelect={true}
                  >
                    <option value={DEFAULT_SELECT_VALUE}>
                      Select a province
                    </option>
                    <option value="Callao">Callao</option>
                  </InputCheckout>

                  <InputCheckout
                    name={INPUT_NAMES.DISTRICT}
                    handleInput={handleInput}
                    isSelect={true}
                  >
                    <option value={DEFAULT_SELECT_VALUE}>
                      Select a district
                    </option>
                    <option value="Ventanilla">Ventanilla</option>
                  </InputCheckout>
                </div>
              </>
            ) : (
              <div className={styles.storeBranchBox}>
                <h3 className={styles.storeBrachTitle}>Store branch</h3>
                <div className={styles.storeBranchDataBox}>
                  <div className={styles.storeBranchData}>
                    <h4 className={styles.storeBranchTitle}>
                      StyleHub Store, Gamarra (Lima)
                    </h4>
                    <p className={styles.storeBranchAddress}>
                      Av. Emilio Caveneda 151, Miraflores, Lima PE-LMA
                    </p>
                  </div>
                  <p>
                    <strong>GRATIS</strong>
                  </p>
                </div>
              </div>
            )}
          </section>
          {/* Payment */}
          <section className={styles.paymentBox}>
            <h2 className={styles.sectionTitle}>Payment</h2>

            <OptionsBox
              name={INPUT_NAMES.PAYMENT_OPTION}
              dataOptions={PAYMENT_OPTIONS}
              onChange={handleInput}
              defaultOption={PAYMENT_OPTIONS[0].text}
            />
          </section>
          {/* Pay now o Finalize Order */}
          <div>
            <button className={styles.finalizeOrderButton}>
              {checkoutForm[INPUT_NAMES.PAYMENT_OPTION] ===
              PAYMENT_OPTIONS[0].text
                ? "Pay now"
                : "Finalize Order"}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.orderSummaryBox}>
        <OrderSummary
          shoppingCartProducts={shoppingCartProducts}
          orderData={checkoutForm}
        />
      </div>
    </div>
  );
};
