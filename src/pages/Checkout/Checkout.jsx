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
import { INPUT_NAMES } from "../../utils/constants";
// import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from "../../utils/constants";

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

  const handleInput = ({ target }) => {
    const { name, value } = target;

    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validar el input al perder el foco
  const handleBlur = ({ target }) => {
    const { name, value } = target;
    const inputValidated = validateInputCheckout({ name, value });

    if (inputValidated.error) {
      console.log(
        "ERROR EN LA VALIDACIÓN DEL INPUT: ",
        inputValidated.error.issues[0].message
      );
      alert(inputValidated.error.issues[0].message);
    } else {
      console.log("VALIDACIÓN CORRECTA PARA: ", name);
    }
  };

  const sendForm = (event) => {
    event.preventDefault();

    // Validations
    const checkoutValidated = validateCheckout(checkoutForm);

    if (checkoutValidated.error) {
      checkoutValidated.error.issues.forEach((error) =>
        console.log(error.message)
      );
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
  // HAY QUE VER QUE EN LOS <select> NO SE PERMITA EL "value" -> "noValid"

  return (
    <div className={styles.checkoutBox}>
      <div className={styles.orderFormBox}>
        <form className={styles.orderForm} onSubmit={sendForm}>
          {/* Contact */}
          <div className={styles.conctactBox}>
            <h2 className={styles.sectionTitle}>Contact</h2>

            <div className={styles.emailBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Email"
                name={INPUT_NAMES.EMAIL}
                onChange={handleInput}
                onBlur={handleBlur}
              />
              {/* <p>Introduce un correo electrónico</p> */}
            </div>
          </div>

          {/* Delivery */}
          <div className={styles.deliveryBox}>
            <h2 className={styles.sectionTitle}>Delivery</h2>

            <OptionsBox
              name={INPUT_NAMES.DELIVERY_OPTION}
              dataOptions={DELIVERY_OPTIONS}
              onChange={handleInput}
              defaultOption={DELIVERY_OPTIONS[0].text}
            />

            <div className={styles.selectCountryBox}>
              <select
                className={`${styles.input}`}
                name={INPUT_NAMES.COUNTRY}
                onChange={handleInput}
                onBlur={handleBlur}
                id=""
              >
                <option value="notValid">Select a country</option>
                <option value="Perú">Perú</option>
              </select>
            </div>

            <div className={styles.namesBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="First name"
                name={INPUT_NAMES.FIRST_NAME}
                onChange={handleInput}
              />
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Last name"
                name={INPUT_NAMES.LAST_NAME}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </div>

            <div className={styles.dniBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="DNI"
                name={INPUT_NAMES.DNI}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </div>

            <div className={styles.addressBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Address"
                name={INPUT_NAMES.ADDRESS}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </div>

            <div className={styles.locationsBox}>
              <select
                className={`${styles.input}`}
                name={INPUT_NAMES.DEPARTMENT}
                onChange={handleInput}
                onBlur={handleBlur}
                id=""
              >
                <option value="notValid">Select a department</option>
                <option value="">Lima</option>
              </select>
              <select
                className={`${styles.input}`}
                name={INPUT_NAMES.PROVINCE}
                onChange={handleInput}
                onBlur={handleBlur}
                id=""
              >
                <option value="notValid">Select a province</option>
                <option value="">Callao</option>
              </select>
              <select
                className={`${styles.input}`}
                name={INPUT_NAMES.DISTRICT}
                onChange={handleInput}
                onBlur={handleBlur}
                id=""
              >
                <option value="notValid">Select a district</option>
                <option value="">Ventanilla</option>
              </select>
            </div>

            <div className={styles.cellPhone}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Cell phone"
                name={INPUT_NAMES.CELL_PHONE}
                onChange={handleInput}
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* Payment */}
          <div className={styles.paymentBox}>
            <h2 className={styles.sectionTitle}>Payment</h2>

            <OptionsBox
              name={INPUT_NAMES.PAYMENT_OPTION}
              dataOptions={PAYMENT_OPTIONS}
              onChange={handleInput}
              defaultOption={PAYMENT_OPTIONS[0].text}
            />
          </div>

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
