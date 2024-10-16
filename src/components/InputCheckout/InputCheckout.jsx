import { useState } from "react";
import { validateInputCheckout } from "../../utils/validations/checkoutValidations";
import styles from "./InputCheckout.module.css";

export const InputCheckout = ({
  placeholder,
  name,
  handleInput,
  isSelect,
  children,
  messageCompleteInput,
}) => {
  const [inputValidated, setInputValidated] = useState(null);

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

      setInputValidated(false);
    } else if (resultInputValidated.success) {
      console.log("VALIDACIÓN CORRECTA PARA: ", name);
      setInputValidated(true);
    }
  };

  return (
    <div>
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
      {inputValidated ? (
        <div
          className={`${styles.messageCompleteInput} ${styles.successColor}`}
        >
          Field completed successfully.
        </div>
      ) : (
        <div className={`${styles.messageCompleteInput} ${styles.errorColor}`}>
          Please complete the field correctly.
        </div>
      )}
    </div>
  );
};

// AGREGAR UN MENSAJE DE EXITO O DE ERROR abajo del INPUT o SELECT :3
{
  /* <p>Introduce un correo electrónico</p> */
}
