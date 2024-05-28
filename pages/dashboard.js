import React from 'react';
import Link from 'next/link';
import { Header } from '/components/Header';
import { LoginModal } from '/components/Home/LoginModal';
import { Main3 } from '/components/Home/Main3';
import { Footer } from '/components/Footer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styles from '/styles/Starter/Starter.module.css'

export default function Home() {

  return (
    <div>
      <div className={styles.body}>
        <Header />
        <LoginModal />
        <div className={styles.pageContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.headerText}>Bevorstehende Rennterimine</div>
          </div>
          <div className={styles.headerBackground}></div>
          <div className={styles.toScheduleText}>
            <Link href={`/starter/kalender`}>
            <p className={styles.linkStyle}>Rennkalender</p>
            </Link>
            <p><PlayArrowIcon fontSize='small' /></p>
          </div>
          <Main3 />
        </div>
      </div>
      <Footer />
    </div>
  )
}