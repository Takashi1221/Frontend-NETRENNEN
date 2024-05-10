import { useAuth } from '/context/AuthContext';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css'; 
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


export const Header = () => {
  const { isLogin, handleOpen, logout } = useAuth();

  return (
    <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src="/images/logo_2.png" alt="Logo" width={80} height={48} />
          <Link href={`/`}>
            <div className={styles.logoText}>
                <span className={styles.net}>net</span>
                <span className={styles.rennen}>rennen</span>
            </div>
          </Link>
        </div>
        <div className={styles.naviText}>
          <Link href={`/starter`}>
            <span className={styles.naviTextMargin}> race </span>
          </Link>
          <Link href={`/news`}>
            <span className={styles.naviTextMargin}> news </span>
          </Link>
          <Link href={`/company`}>
            <span className={styles.naviTextMargin}> about </span>
          </Link>
          <Link href={`/company/contact`}>
            <span className={styles.naviTextMargin}> contact </span>
          </Link>
        </div>
        <div className={styles.naviLogin}>
          {isLogin ? (
            <div>
              <Link href={`/account/mypage`}>
                <PersonOutlineIcon sx={{ 
                    marginRight: '30px', 
                    paddingTop: '3px',
                    fontSize: '42px', 
                    color: '#f3ede4'
                }} />
              </Link>
              <Button 
                onClick={logout}
                variant="outlined"
                sx={{
                  color: '#f3ede4', // テキストカラー
                  fontWeight: 'bold',
                  borderWidth: 2,
                  borderColor: '#f3ede4', // 枠線の色
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', // ホバー時の背景色をわずかに白く
                    borderColor: '#f3ede4', // ホバー時も枠線を保つ
                    borderWidth: 2,
                  },
                  // 他の必要なスタイルがあればここに追加
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Link href={`/account/signup`}>
                <Button 
                  variant="outlined"
                  sx={{
                    color: '#f3ede4', // テキストカラー
                    fontWeight: 'bold',
                    borderWidth: 2,
                    borderColor: '#f3ede4', // 枠線の色
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)', // ホバー時の背景色をわずかに白く
                      borderColor: '#f3ede4', // ホバー時も枠線を保つ
                      borderWidth: 2,
                    },
                    // 他の必要なスタイルがあればここに追加
                  }}
                >
                  SignUp
                </Button>
              </Link>
              <Button 
                onClick={handleOpen}
                variant="outlined"
                sx={{
                  color: '#f3ede4', // テキストカラー
                  fontWeight: 'bold',
                  borderWidth: 2,
                  borderColor: '#f3ede4', // 枠線の色
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', // ホバー時の背景色をわずかに白く
                    borderColor: '#f3ede4', // ホバー時も枠線を保つ
                    borderWidth: 2,
                  },
                  // 他の必要なスタイルがあればここに追加
                }}
              >
                Login
              </Button>
            </div>
          )}
          
        </div>
    </header>
  )  
}