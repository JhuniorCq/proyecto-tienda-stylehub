import styles from "./StartSection.module.css";
import mainModel from "../../assets/images/main-model.png";

export const StartSection = () => {
  return (
    <section className={styles.boxStart}>
      <div className={styles.boxText}>
        <p className={styles.preTitle}>—— NEW SHOP</p>
        <h1 className={styles.storeName}>STYLE HUB</h1>
        <p className={styles.storeSlogan}>WHERE STYLE MEETS ELEGANCE</p>
      </div>
      <div className={styles.boxImage}>
        <img src={mainModel} alt="" />
      </div>
    </section>
  );
};
