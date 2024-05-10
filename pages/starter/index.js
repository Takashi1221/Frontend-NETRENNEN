import React from 'react';
import { Header } from '../../components/Header';
import { LoginModal } from '../../components/Home/LoginModal';
import { Main2 } from '../../components/Home/Main2';
import styles from '/styles/Starter/Starter.module.css'

export default function Home() {

  return (
      <div className={styles.body}>
        <Header />
        <LoginModal />
        <div className={styles.pageContainer}>
            <div className={styles.headerText}>
                RENNEN
            </div>
            <div>
              <Main2 />
            </div>
        </div>
    </div>

  )
}