import Head from 'next/head';
import React, { useRef } from 'react';
import styles from '/styles/Home/Bg.module.css'; 
import { Header } from '../components/Header';
import { Main1 } from '../components/Home/Main1';
import { LoginModal } from '../components/Home/LoginModal';


export default function Home() {

  return (
    <div className={styles.body}>
      <Head>
        <title>Netrennen</title>
        <meta name="description" />
      </Head>

      <Header />
      <LoginModal />

      <Main1 />

      <div className={styles.spaceContainer}></div>
      {/* Rest of the page content */}

    </div>
  )
}