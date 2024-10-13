import { useState } from "react";
import { validateInputCheckout } from "../../utils/validations/checkoutValidations";
import styles from "./InputCheckout.module.css";

export const InputCheckout = ({
  placeholder,
  name,
  handleInput,
  isSelect,
  children,
  // onBlur,
  // inputValidated,
}) => {
  const [inputValidated, setInputValidated] = useState(null);

  // const handleInput = ({ target }) => {
  //   const { name, value } = target;

  //   setCheckoutForm((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Validar el input al perder el foco
  const handleBlur = ({ target }) => {
    const { name, value } = target;
    const resultInputValidated = validateInputCheckout({ name, value });

    if (!resultInputValidated.success) {
      console.log(
        "ERROR EN LA VALIDACIÓN DEL INPUT: ",
        resultInputValidated.error.issues[0].message,
        "El name:",
        name,
        "El value",
        value
      );
      // alert(resultInputValidated.error.issues[0].message);
      setInputValidated(false);
    } else if (resultInputValidated.success) {
      console.log("VALIDACIÓN CORRECTA PARA: ", name);
      setInputValidated(true);
    }
  };

  return (
    <>
      {isSelect ? (
        <div className={styles.inputBox}>
          <select
            name={name}
            id=""
            className={`${styles.input} ${
              inputValidated
                ? styles.inputValidated
                : inputValidated === false
                ? styles.inputNotValidated
                : ""
            }`}
            onChange={handleInput}
            onBlur={handleBlur}
          >
            {children}
          </select>
        </div>
      ) : (
        <div className={styles.inputBox}>
          <input
            className={`${styles.input} ${
              inputValidated
                ? styles.inputValidated
                : inputValidated === false
                ? styles.inputNotValidated
                : ""
            }`}
            type="text"
            placeholder={placeholder}
            name={name}
            onChange={handleInput}
            onBlur={handleBlur}
          />
        </div>
      )}
    </>
  );
};

{
  /* <p>Introduce un correo electrónico</p> */
}
