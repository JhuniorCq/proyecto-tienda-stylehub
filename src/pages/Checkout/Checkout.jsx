import styles from "./Checkout.module.css";
import { TbTruck } from "react-icons/tb";
import { LuStore } from "react-icons/lu";
import { OptionsBox } from "../../components/OptionsBox/OptionsBox";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { useState } from "react";
import {
  validateCheckout,
  validateInputCheckout,
} from "../../utils/validations/checkoutValidations";
import { checkoutValidationsModal } from "../../utils/notifications/modals";
import { DEFAULT_SELECT_VALUE, INPUT_NAMES } from "../../utils/constants";
import { InputCheckout } from "../../components/InputCheckout/InputCheckout";

// OPCIONES DE ENVÍO
export const DELIVERY_OPTIONS = [
  {
    text: "Shipping",
    icon: <TbTruck />,
  },
  {
    text: "Pick up in store",
    icon: <LuStore />,
  },
];

// OPCIONES DE PAGO
export const PAYMENT_OPTIONS = [
  {
    text: "Paypal",
    additionalData: {
      message:
        "After clicking on “Pay now”, you will be redirected to Paypal to complete your purchase safely.",
      icon: <IoArrowRedoOutline />,
    },
  },
  {
    text: "Yape",
    additionalData: {
      message: "The number will appear after clicking “Checkout”.",
      icon: <MdOutlinePhoneIphone />,
    },
  },
];

export const Checkout = () => {
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

  // const [inputValidated, setInputValidated] = useState(null);

  // HAY QUE USAR ESTO PARA NO MOSTRAR LOS INPUTS QUE CORRESPONDEN AL TIPO DE ENTREGA "ENVÍO"
  const [selectedDelivery, setSelectedDelivery] = useState(
    DELIVERY_OPTIONS[0].text
  );

  const changeDeliveryTypeSelection = () => {
    setSelectedDelivery((prev) =>
      prev === DELIVERY_OPTIONS[0].text
        ? DELIVERY_OPTIONS[1].text
        : DELIVERY_OPTIONS[0].text
    );
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;

    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendForm = (event) => {
    event.preventDefault();

    // Validations
    const checkoutValidated = validateCheckout(checkoutForm);

    if (checkoutValidated.error) {
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

      // return;
    } else {
      alert("Todo fino");
    }

    console.log("Enviando: ", checkoutForm);
  };

  // COLOCAR flex-grow: 1 A CADA <div> DE UN INPUT (PROBAR ESO PARA LUEGO CREAR EL COMPONENTE INPUT)
  // HAY QUE VER QUE EN LOS <select> NO SE PERMITA EL "value" -> "notValid"

  return (
    <div className={styles.checkoutBox}>
      <div className={styles.orderFormBox}>
        <form className={styles.orderForm} onSubmit={sendForm}>
          {/* Contact */}
          <section className={styles.conctactBox}>
            <h2 className={styles.sectionTitle}>Contact</h2>

            <InputCheckout
              placeholder="Email"
              name={INPUT_NAMES.EMAIL}
              onChange={handleInput}
              messageCompleteInput="Please enter a valid email address."
            />

            <div className={styles.namesBox}>
              <InputCheckout
                placeholder="First name"
                name={INPUT_NAMES.FIRST_NAME}
                onChange={handleInput}
              />
              <InputCheckout
                placeholder="Last name"
                name={INPUT_NAMES.LAST_NAME}
                onChange={handleInput}
              />
            </div>

            <InputCheckout
              placeholder="DNI"
              name={INPUT_NAMES.DNI}
              onChange={handleInput}
            />

            <InputCheckout
              placeholder="Cell phone"
              name={INPUT_NAMES.CELL_PHONE}
              onChange={handleInput}
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

            {selectedDelivery === DELIVERY_OPTIONS[0].text ? (
              <>
                <InputCheckout
                  name={INPUT_NAMES.COUNTRY}
                  onChange={handleInput}
                  isSelect={true}
                >
                  <option value={DEFAULT_SELECT_VALUE}>Select a country</option>
                  <option value="Perú">Perú</option>
                </InputCheckout>
                <InputCheckout
                  placeholder="Address"
                  name={INPUT_NAMES.ADDRESS}
                  onChange={handleInput}
                />
                <div className={styles.locationsBox}>
                  <InputCheckout
                    name={INPUT_NAMES.DEPARTMENT}
                    onChange={handleInput}
                    isSelect={true}
                  >
                    <option value={DEFAULT_SELECT_VALUE}>
                      Select a department
                    </option>
                    <option value="">Lima</option>
                  </InputCheckout>

                  <InputCheckout
                    name={INPUT_NAMES.PROVINCE}
                    onChange={handleInput}
                    isSelect={true}
                  >
                    <option value={DEFAULT_SELECT_VALUE}>
                      Select a province
                    </option>
                    <option value="">Callao</option>
                  </InputCheckout>

                  <InputCheckout
                    name={INPUT_NAMES.DISTRICT}
                    onChange={handleInput}
                    isSelect={true}
                  >
                    <option value={DEFAULT_SELECT_VALUE}>
                      Select a district
                    </option>
                    <option value="">Ventanilla</option>
                  </InputCheckout>
                </div>
              </>
            ) : (
              <div>Holi</div>
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
          {/* Pay now o Checkout */}
          <div>
            <button className={styles.finalizeOrderButton}>Pay now</button>
          </div>
        </form>
      </div>
      <div className={styles.orderSummaryBox}></div>
    </div>
  );
};
