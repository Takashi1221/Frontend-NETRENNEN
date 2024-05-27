import { useAuth } from '/context/AuthContext';
import Button from '@mui/material/Button';
import Image from 'next/image';
import styles from '../styles/HeaderLanding.module.css'; 


export const HeaderLanding = () => {
  const { handleOpen } = useAuth();

  return (
    <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src="/images/logo_2.png" alt="Logo" width={80} height={48} />
            <div className={styles.logoText}>
                <span className={styles.net}>net</span>
                <span className={styles.rennen}>rennen</span>
            </div>
        </div>
        <div className={styles.naviLogin}>
          <div>
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
                '&:hover': {
                  backgroundColor: 'rgb(101, 101, 101)', // ホバー時の背景色
                  borderColor: 'rgb(101, 101, 101)', // ホバー時の枠線の色
                  borderWidth: '4px',
                },
                '@media (max-width: 500px)': {
                  fontSize: '1rem !important', // 小さい画面のフォントサイズ
                  padding: '8px 16px !important', // 小さい画面のパディング
                },
                // 他の必要なスタイルがあればここに追加
              }}
            >
              Login
            </Button>
          </div>
        </div>
    </header>
  )  
}