import styles from "./Loader.module.css";

export const Loader = () => {
    return (
        <div className={styles.boxLoader}>
            <div className={styles.loader}></div>
        </div>
    );
}