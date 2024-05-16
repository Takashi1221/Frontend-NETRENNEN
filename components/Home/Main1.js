import Image from 'next/image';
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
          <div>
            <Image
              src="https://vercel-netrennen.s3.eu-central-1.amazonaws.com/topimage.jpg"
              alt="show_photo"
              width={500}
              height={300}
            />
          </div>
        </div>

      </div>
    )  
}
