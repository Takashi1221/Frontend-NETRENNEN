import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '/context/AuthContext';
import { Header } from '/components/Header/Header';
import { LoginModal } from '/components/Header/LoginModal';
import { RennTermine } from '/components/Starter/RennTermine';
import { Footer } from '/components/Header/Footer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styles from '/styles/Starter/Starter.module.css'

export default function Home() {
  const { isLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/');
    }
  }, [isLogin, router]);

  if (!isLogin) {
    return null; // リダイレクトが完了するまで何も表示しない
  }

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
          <RennTermine />
        </div>
      </div>
      <Footer />
    </div>
  )
}