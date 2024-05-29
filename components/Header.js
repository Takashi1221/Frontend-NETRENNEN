import { useAuth } from '/context/AuthContext';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from '/styles/Header.module.css'; 
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState, useEffect, useRef } from 'react';

export const Header = () => {
  const { isLogin, handleOpen, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <Link href={`/account/premium`}>
                <Button 
                  variant="contained"
                  sx={{
                    marginRight: '30px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    backgroundColor: '#FBCB0A',
                    color: '#333',
                    fontSize: '1rem',
                    fontWeight: '700',
                    '&:hover': {
                      backgroundColor: '#ffd940', // ホバー時の色
                    },
                  }}
                >
                  Premium
                </Button>
              </Link>
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
                variant="text" // テキストボタンをベースにする
                sx={{
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  textDecoration: 'underline', // アンダーラインを追加
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    color: 'red',
                    textDecoration: 'underline',
                  },
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
                }}
              >
                Login
              </Button>
            </div>
          )}
        </div>
        <div className={styles.premiumButton}>
          <Link href={`/account/premium`}>
            <Button 
              variant="contained"
              sx={{
                marginTop: '2px',
                marginRight: '30px',
                paddingTop: '1px',
                paddingBottom: '1px',
                paddingLeft: '10px',
                paddingRight: '10px',
                backgroundColor: '#FBCB0A',
                color: '#333',
                fontSize: '0.8rem',
                fontWeight: '700',
                '&:hover': {
                  backgroundColor: '#ffd940', // ホバー時の色
                },
              }}
            >
              Premium
            </Button>
          </Link>
        </div>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div ref={menuRef} className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
          <Link href={`/dashboard`}><span onClick={toggleMenu}>Rennen</span></Link>
          <Link href={`/news`}><span onClick={toggleMenu}>News</span></Link>
          <Link href={`/about`}><span onClick={toggleMenu}>Über uns</span></Link>
          <Link href={`/contact`}><span onClick={toggleMenu}>Kontakt</span></Link>
          {isLogin ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <>
              <Link href={`/account/signup`}><span onClick={toggleMenu}>SignUp</span></Link>
              <span onClick={handleOpen}>Login</span>
            </>
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