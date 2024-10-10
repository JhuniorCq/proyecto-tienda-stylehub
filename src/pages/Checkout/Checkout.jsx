import styles from "./Checkout.module.css";
import { TbTruck } from "react-icons/tb";
import { LuStore } from "react-icons/lu";
import { OptionsBox } from "../../components/OptionsBox/OptionsBox";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";

export const Checkout = () => {
  const deliveryOptions = [
    {
      text: "Shipping",
      icon: <TbTruck className={styles.iconDelivery} />,
    },
    {
      text: "Pick up in store",
      icon: <LuStore className={styles.iconDelivery} />,
    },
  ];

  const paymentOptions = [
    {
      text: "Paypal",
      additionalData: {
        message:
          "After clicking on “Pay now”, you will be redirected to Paypal to complete your purchase safely.",
        icon: <IoArrowRedoOutline className={styles.iconAdditional} />,
      },
    },
    {
      text: "Yape",
      additionalData: {
        message: "The number will appear after clicking “Checkout”.",
        icon: <MdOutlinePhoneIphone className={styles.iconAdditional} />,
      },
    },
  ];

  return (
    <div className={styles.checkoutBox}>
      <div className={styles.orderFormBox}>
        <form className={styles.orderForm}>
          <div className={styles.conctactBox}>
            <h2 className={styles.sectionTitle}>Contact</h2>

            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Email"
            />
          </div>

          <div className={styles.deliveryBox}>
            <h2 className={styles.sectionTitle}>Delivery</h2>

            {/* <div className={styles.deliveryOptionsBox}>
              <label className={styles.optionDelivery}>
                <div className={styles.optionDeliveryInputBox}>
                  <input className={`${styles.input}`} type="radio" />
                  <p>Shipping</p>
                </div>
                <TbTruck className={styles.iconDelivery} />
              </label>

              <label className={styles.optionDelivery}>
                <div className={styles.optionDeliveryInputBox}>
                  <input className={`${styles.input}`} type="radio" />
                  <p>Pick up in store</p>
                </div>
                <LuStore className={styles.iconDelivery} />
              </label>
            </div> */}

            <OptionsBox name="deliveryOptions" dataOptions={deliveryOptions} />

            <div className={styles.selectCountryBox}>
              <select className={`${styles.input}`} name="" id="">
                <option value="">Perú</option>
              </select>
            </div>

            <div className={styles.namesBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="First name"
              />
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Last name"
              />
            </div>

            <div className={styles.dniBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="DNI"
              />
            </div>

            <div className={styles.addressBox}>
              <input
                className={`${styles.input}`}
                type="text"
                placeholder="Address"
              />
            </div>

            <div className={styles.locationsBox}>
              <select className={`${styles.input}`} name="" id="">
                <option value="">Lima</option>
              </select>
              <select className={`${styles.input}`} name="" id="">
                <option value="">Callao</option>
              </select>
              <select className={`${styles.input}`} name="" id="">
                <option value="">Ventanilla</option>
              </select>
            </div>
          </div>

          <div className={styles.paymentBox}>
            <h2 className={styles.sectionTitle}>Payment</h2>

            {/* <div className={styles.paymentOptionsBox}>
              <label className={styles.optionPayment}>
                <div className={styles.optionPaymentInputBox}>
                  <input className={`${styles.input}`} type="radio" />
                  <p>Paypal</p>
                </div>
              </label>

              <label className={styles.optionPayment}>
                <div className={styles.optionPaymentInputBox}>
                  <input className={`${styles.input}`} type="radio" />
                  <p>Yape</p>
                </div>
              </label>
            </div> */}

            <OptionsBox name="paymentOptions" dataOptions={paymentOptions} />
          </div>

          <div className={styles.cellPhone}>
            <input
              className={`${styles.input}`}
              type="text"
              placeholder="Cell phone"
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
