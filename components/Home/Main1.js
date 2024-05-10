import styles from '/styles/Home/Main1.module.css'; 


export function Main1() {

    return (
      <div className={styles.mainContainer}>
        <div className={styles.landingContainer}>
          <div className={styles.landingTextContainer}>
            <span className={styles.landingText}>Easy racing,</span>
            <span className={styles.landingText}>more fun</span>
            <span className={styles.landingText}>All you need</span>
            <span className={styles.landingText}>is here</span>
          </div>
        </div>

      </div>
    )  
}
