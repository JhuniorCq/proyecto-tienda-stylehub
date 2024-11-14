import styles from "./StartSection.module.css";
import mainModel from "../../assets/images/main-model.png";
import carouselMensClothing from "../../assets/images/carouselMensClothing.png";
import carouselWomensClothing from "../../assets/images/carouselWomensClothing.png";
import carouselElectronics from "../../assets/images/carouselElectronics.png";
import carouselJewelry from "../../assets/images/carouselJewelry.png";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

const carouselImages = [
  carouselMensClothing,
  carouselWomensClothing,
  carouselElectronics,
  carouselJewelry,
];

export const StartSection = () => {
  const [indexCarousel, setIndexCarousel] = useState(0);

  const decreaseCarouselIndex = () => {
    setIndexCarousel((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const increaseCarouselIndex = () => {
    setIndexCarousel((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      increaseCarouselIndex();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    // <section className={styles.boxStart}>
    //   <div className={styles.boxText}>
    //     <p className={styles.preTitle}>—— NEW SHOP</p>
    //     <h1 className={styles.storeName}>STYLE HUB</h1>
    //     <p className={styles.storeSlogan}>WHERE STYLE MEETS ELEGANCE</p>
    //   </div>
    //   <div className={styles.boxImage}>
    //     <img src={mainModel} alt="" />
    //   </div>
    // </section>
    <section className={styles.boxStart}>
      <div className={styles.boxCarousel}>
        <img
          className={styles.imageCarousel}
          src={carouselImages[indexCarousel]}
          alt="Carrousel Image"
        />
        <FaChevronLeft
          className={`${styles.buttonCarousel} ${styles.buttonLeft}`}
          onClick={decreaseCarouselIndex}
        />
        <FaChevronRight
          className={`${styles.buttonCarousel} ${styles.buttonRight}`}
          onClick={increaseCarouselIndex}
        />
      </div>
    </section>
  );
};
