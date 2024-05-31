import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { HeaderLanding } from './Header/HeaderLanding';
import { LoginModal } from './Header/LoginModal';
import styles from '/styles/Home/Bg.module.css';

export function BackgroundSlider() {
  return (
    <div className={styles.backgroundSlider}>
        <div>
            <HeaderLanding />
            <LoginModal />
        </div>
        <div className={styles.mainContainer}>
            <div className={styles.mainText}>
                Hacken wir die Pferderennen.
            </div>
            <div className={styles.subtextContainer}>
                <p className={styles.subText}>
                    NETRENNEN ist die neue Plattform für die deutsche Pferderennen.
                </p>
                <p className={styles.subText}>
                    Für die Nutzung ist eine Mitgliedsregistrierung erforderlich.
                </p>
            </div>
            <div>
              <Link href={`/account/signup`}>
                <Button 
                  variant="outlined"
                  sx={{
                    color: '#f3ede4', // テキストカラー
                    fontWeight: 'bold',
                    fontSize: '1.6em', // テキストサイズを大きく
                    borderWidth: 4, // 枠線の太さも2倍に
                    borderColor: '#f3ede4', // 枠線の色
                    marginTop: '40px',
                    padding: '12px 24px', // パディングを調整してボタンのサイズを増加
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)', // ホバー時の背景色をわずかに白く
                      borderColor: '#f3ede4', // ホバー時も枠線を保つ
                      borderWidth: 4, // ホバー時の枠線の太さも2倍に
                    },
                    '@media (max-width: 500px)': {
                      fontSize: '1em',
                      padding: '8px 16px',
                      marginTop: '20px',
                    },
                    // 他の必要なスタイルがあればここに追加
                  }}
                >
                  SignUp
                </Button>
              </Link>
            </div>
        </div>
    </div>
  );
}