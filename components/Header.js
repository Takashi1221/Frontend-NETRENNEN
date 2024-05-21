import { useAuth } from '/context/AuthContext';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from '../styles/Header.module.css'; 
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


export const Header = () => {
  const { isLogin, handleOpen, logout } = useAuth();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBackground}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImg}></div>
          <Link href={`/dashboard`}>
          <div className={styles.logoText}>netrennen</div>
          </Link>
        </div>
        <div className={styles.naviLogin}>
          {isLogin ? (
            <div>
              <Link href={`/account/mypage`}>
                <PersonOutlineIcon sx={{ 
                    marginRight: '30px', 
                    paddingTop: '3px',
                    fontSize: '51px', 
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                }} />
              </Link>
              <Button 
                onClick={logout}
                variant="outlined"
                sx={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '700',
                  borderWidth: 4,
                  borderColor: '#ffffff', // 枠線の色
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', // ホバー時わずかに白く
                    borderColor: '#ffffff', // ホバー時も枠線を保つ
                    borderWidth: 4,
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
                    marginRight: '30px', 
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: '700',
                    borderWidth: 4,
                    borderColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderColor: '#ffffff',
                      borderWidth: 4,
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
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: '700',
                  borderWidth: 4,
                  borderColor: '#ffffff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: '#ffffff',
                    borderWidth: 4,
                  },
                  // 他の必要なスタイルがあればここに追加
                }}
              >
                Login
              </Button>
            </div>
          )}
          
        </div>
      </div>
      <div className={styles.headerNaviContainer}>
        <div className={styles.naviText}>
            <Link href={`/dashboard`}>
              <span className={styles.naviTextMargin}>Rennen</span>
            </Link>
            <Link href={`/news`}>
              <span className={styles.naviTextMargin}>News</span>
            </Link>
            <Link href={`/about`}>
              <span className={styles.naviTextMargin}>Über uns</span>
            </Link>
            <Link href={`/contact`}>
              <span className={styles.naviTextMargin}>Kontakt</span>
            </Link>
          </div>
      </div>
    </div>
  )  
}