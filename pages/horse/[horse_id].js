import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/context/AuthContext';
import { Header } from '../../components/Header/Header';
import { LoginModal } from '../../components/Header/LoginModal';
import { Footer } from '../../components/Header/Footer';
import { HorseMenuTabs } from '../../components/Horse/TabMenu';
import styles from '/styles/Horse/HorsePage.module.css';


function HorsePage() {
  const { isLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // ローカルストレージから初期状態を設定
    const storedLoginStatus = localStorage.getItem('isLogin');
    console.log(isLogin)
    console.log(storedLoginStatus)
    if (storedLoginStatus !== 'true') {
      router.push('/');
    }
  }, [isLogin, router]);

  if (!isLogin) {
    return null; // リダイレクトが完了するまで何も表示しない
  }

  return (
    <div className={styles.body}>
      <Header />
      <LoginModal />
  
      <HorseMenuTabs />

      <Footer />
    </div>
  );
}
export default HorsePage;