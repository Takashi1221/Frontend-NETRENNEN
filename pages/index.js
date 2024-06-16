import React from 'react';
import { useAuth } from '/context/AuthContext';
import Link from 'next/link';
import Button from '@mui/material/Button';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { BackgroundSlider } from '../components/InfiniteSlider';
import styles from '/styles/Home/Bg.module.css';
import { LoginModal } from '../components/Header/LoginModal';


const Home = () => {
  const { handleOpen } = useAuth();


  return (
    <div className={styles.landingBody}>
      <BackgroundSlider />
      <div className={styles.page2}>
        <div className={styles.flexRow}>
          <div className={styles.landingTextContainerOne}>
            <h2>Informationen zu Pferden und Datenanalyse</h2>
            <p>Mit Netrennen haben Sie alle Pferdeinformationen und Streckendaten bequem auf Ihrem Gerät. Einfach, schnell und übersichtlich.</p>
            <ul className={styles.bulletList}>
              <li>Jockey-Siegraten auf verschiedenen Rennstrecken.</li>
              <li>Siegraten der Favoriten auf jeder Rennstrecke.</li>
              <li>Gewinnraten der verschiedenen Hengste.</li>
              <li>Und so weiter</li>
            </ul>
            <Link href={`/account/signup`}>
              <Button 
                variant="outlined"
                sx={{
                  color: 'rgba(42, 175, 48, 0.873)', // テキストカラー
                  fontWeight: 'bold',
                  fontSize: '1em', // テキストサイズを大きく
                  borderWidth: 4, // 枠線の太さも2倍に
                  borderColor: 'rgba(42, 175, 48, 0.873)', // 枠線の色
                  borderRadius: '7.5px',
                  marginTop: '40px',
                  padding: '12px 24px', // パディングを調整してボタンのサイズを増加
                  '&:hover': {
                    backgroundColor: 'rgb(226, 254, 227)', // ホバー時の背景色をわずかに白く
                    borderWidth: 4, // ホバー時の枠線の太さも2倍に
                    borderColor: 'rgba(42, 175, 48, 0.873)',
                  },
                  '@media (max-width: 500px)': {
                    fontSize: '0.8rem',
                    padding: '4px 12px',
                    marginTop: '10px',
                  },
                  // 他の必要なスタイルがあればここに追加
                }}
              >
                SignUp
              </Button>
            </Link>
          </div>
          <div className={styles.imageContainerOne}>
            <div className={styles.imageOne}></div>
          </div>
        </div>
        <div className={styles.backgroundPorigon}></div>
      </div>
      <div className={styles.page3}>
        <div className={styles.imageContainerTwo}>
          <div className={styles.imageTwo}></div>
        </div>
        <div className={styles.landingTextContainerTwo}>
          <h2>Detaillierte Informationen zu den Pferden</h2>
            <ul className={styles.bulletList}>
              <li>Grundlegende Informationen über das Pferd.</li>
              <li>Detaillierte Informationen zur Pedigree.</li>
              <li>Rennstatistik.</li>
              <li>Laufstil im letzten Rennen.</li>
            </ul>
        </div>
      </div>
      <div className={styles.page4}>
        <div className={styles.backgroundEllipse}></div>
        <div className={styles.footerTitle}>netrennen</div>
        <div className={styles.flexRow}>
          <div className={styles.landingTextContainerThree}>
            <p>Jetzt kostenlos starten <RocketLaunchIcon /></p>
          </div>
          <div className={styles.underButtonContainer}>
            <Link href={`/account/signup`}>
              <Button 
                variant="outlined"
                sx={{
                  color: 'rgba(42, 175, 48, 0.873)', // テキストカラー
                  fontWeight: 'bold',
                  fontSize: '1em', // テキストサイズを大きく
                  borderWidth: 4, // 枠線の太さも2倍に
                  borderColor: 'rgba(42, 175, 48, 0.873)', // 枠線の色
                  borderRadius: '7.5px',
                  marginTop: '40px',
                  padding: '12px 24px', // パディングを調整してボタンのサイズを増加
                  '&:hover': {
                    backgroundColor: 'rgb(226, 254, 227)', // ホバー時の背景色をわずかに白く
                    borderWidth: 4, // ホバー時の枠線の太さも2倍に
                    borderColor: 'rgba(42, 175, 48, 0.873)',
                  },
                  '@media (max-width: 500px)': {
                    fontSize: '0.8rem',
                    padding: '4px 12px',
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
        <div className={styles.flexRow}>
          <div className={styles.landingTextContainerThree}>
            <p>Bereits registriert? Hier einloggen</p>
          </div>
          <div className={styles.underButtonContainer}>
            <Button 
              onClick={handleOpen}
              variant="outlined"
              sx={{
                backgroundColor: 'rgb(59, 59, 59)',
                color: '#f3ede4', // テキストカラー
                fontWeight: 'bold',
                fontSize: '1.4em',
                borderWidth: '4px',
                borderColor: 'rgb(59, 59, 59)', // 枠線の色
                borderRadius: '7.5px',
                '&:hover': {
                  backgroundColor: 'rgb(101, 101, 101)', // ホバー時の背景色
                  borderColor: 'rgb(101, 101, 101)', // ホバー時の枠線の色
                  borderWidth: '4px',
                },
                '@media (max-width: 500px)': {
                    fontSize: '0.9rem',
                    padding: '4px 12px',
                    marginTop: '20px',
                  },
                // 他の必要なスタイルがあればここに追加
              }}
            >
              Login
            </Button>
            <LoginModal />
          </div>
        </div>
        <div className={styles.footerDammy}></div>
      </div>
    </div>
  );
};

// サーバーサイドでクッキーをチェックし、リダイレクト
export async function getServerSideProps({ req }) {
  const { cookies } = req;
  const token = cookies.access;

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // 必要な場合に他のプロパティを追加
  };
}

export default Home;