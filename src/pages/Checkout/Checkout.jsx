import styles from "./Checkout.module.css";
import { TbTruck } from "react-icons/tb";
import { LuStore } from "react-icons/lu";
import { OptionsBox } from "../../components/OptionsBox/OptionsBox";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { useState } from "react";
import { validateCheckout } from "../../utils/validations/checkoutValidations";
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
    email: null,
    deliveryOption: null,
    country: "Perú",
    firstName: null,
    lastName: null,
    dni: null,
    address: null,
    department: null,
    province: null,
    district: null,
    cellPhone: null,
    paymentOption: null,
  });

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
      console.log("Error en la Validación", checkoutValidated.error.issues);
      alert("Error en las validaciones.");
      // return;
    }

    console.log("Enviando: ", checkoutForm);
  };

  return (
    <div className={styles.checkoutBox}>
      <div className={styles.orderFormBox}>
        <form className={styles.orderForm} onSubmit={sendForm}>
          {/* Contact */}
          <div className={styles.conctactBox}>
            <h2 className={styles.sectionTitle}>Contact</h2>

            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleInput}
            />
          </div>

          {/* Delivery */}
          <div className={styles.deliveryBox}>
            <h2 className={styles.sectionTitle}>Delivery</h2>

            <OptionsBox
              name="deliveryOption"
              dataOptions={DELIVERY_OPTIONS}
              onChange={handleInput}
            />

            <div className={styles.selectCountryBox}>
              <select
                className={`${styles.input}`}
                name="country"
                onChange={handleInput}
                id=""
              >
                {/* <option value="notValid"></option> */}
                <option value="Perú">Perú</option>
              </select>
            </div>

            <div className={styles.namesBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="First name"
                name="firstName"
                onChange={handleInput}
              />
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Last name"
                name="lastName"
                onChange={handleInput}
              />
            </div>

            <div className={styles.dniBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="DNI"
                name="dni"
                onChange={handleInput}
              />
            </div>

            <div className={styles.addressBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleInput}
              />
            </div>

            <div className={styles.locationsBox}>
              <select
                className={`${styles.input}`}
                name="department"
                onChange={handleInput}
                id=""
              >
                <option value="">Lima</option>
              </select>
              <select
                className={`${styles.input}`}
                name="province"
                onChange={handleInput}
                id=""
              >
                <option value="">Callao</option>
              </select>
              <select
                className={`${styles.input}`}
                name="district"
                onChange={handleInput}
                id=""
              >
                <option value="">Ventanilla</option>
              </select>
            </div>

            <div className={styles.cellPhone}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Cell phone"
                name="cellPhone"
                onChange={handleInput}
              />
            </div>
          </div>

          {/* Payment */}
          <div className={styles.paymentBox}>
            <h2 className={styles.sectionTitle}>Payment</h2>

            <OptionsBox
              name="paymentOption"
              dataOptions={PAYMENT_OPTIONS}
              onChange={handleInput}
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
