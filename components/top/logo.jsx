import styles from "./logo.module.scss";
const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.main}>
        <p>Vietnamese Fish Sauce</p>
      </div>
      <div className={styles.sub}>
        <p>Nước mắm Bình Định</p>
      </div>
    </div>
  );
};

export default Logo;
