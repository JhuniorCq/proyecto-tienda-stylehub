import styles from "./OptionsBox.module.css";

export const OptionsBox = ({ dataOptions, name }) => {
  return (
    <div className={styles.optionsBox}>
      {dataOptions.map((option, index) => {
        const { text, icon, additionalData, existsAdditionalData } = option;

        return (
          <>
            <label key={index} className={styles.option}>
              <div className={styles.optionInputBox}>
                <input className={`${styles.input}`} type="radio" name={name} />
                <p>{text}</p>
              </div>
              {icon}
            </label>
            {additionalData && (
              <div key={index} className={styles.additionalDataBox}>
                {additionalData.icon}
                <p>{additionalData.message}</p>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
