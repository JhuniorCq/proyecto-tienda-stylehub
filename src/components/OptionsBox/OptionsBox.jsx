import { useState } from "react";
import styles from "./OptionsBox.module.css";

export const OptionsBox = ({ dataOptions, name }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    console.log(event.target);
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.optionsBox}>
      {dataOptions.map((option, index) => {
        const { text, icon, additionalData } = option;

        return (
          <div key={index}>
            <label
              className={`${styles.option} ${
                selectedOption === `option-${index}`
                  ? styles.selectedOption
                  : ""
              }`}
            >
              <div className={styles.optionInputBox}>
                <input
                  className={`${styles.input}`}
                  type="radio"
                  name={name}
                  value={`option-${index}`}
                  onChange={handleOptionChange}
                  // checked={}
                />
                <p className={styles.optionText}>{text}</p>
              </div>
              <span
                className={
                  selectedOption === `option-${index}`
                    ? `${styles.iconOption} ${styles.iconOptionSelected}`
                    : styles.iconOption
                }
              >
                {icon}
              </span>
            </label>
            {additionalData && (
              <div
                className={
                  selectedOption === `option-${index}`
                    ? `${styles.additionalDataBox} ${styles.visible}`
                    : styles.additionalDataBox
                }
              >
                <span className={styles.iconAdditional}>
                  {additionalData.icon}
                </span>
                <p className={styles.additionalOptionText}>
                  {additionalData.message}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
