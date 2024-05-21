import Link from 'next/link'
import styles from '/styles/Footer.module.css'


export const Footer = () => {

  return (
      <div className={styles.footerContainer}>
        <div className={styles.footerDummySpace}></div>
        <div className={styles.footerContents}>
          <Link href={`/impressum`}>
          <p className={styles.footerContentsItem}>Impressum</p>
          </Link>
          <Link href={`/datenschutz`}>
          <p>Datenschutzerklärung</p>
          </Link>
        </div>
        <div className={styles.footerCopyRight}>Copyright © 2024 NETRENNEN all rights reserved</div>
      </div>
  )  
}