import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // axiosをインポート
import { useRouter } from 'next/router';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();
  
  // ログイン状態をチェック
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/checkauth/');
        if (response.status === 200) {
          setIsLogin(true);
          localStorage.setItem('isLogin', 'true'); // ローカルストレージに保存
        } else {
          setIsLogin(false);
          localStorage.removeItem('isLogin'); // ローカルストレージから削除
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (error.response && error.response.status === 401) {
          // Attempt to refresh the token
          refreshAccessToken();
        } else {
          setIsLogin(false);
          localStorage.removeItem('isLogin'); // ローカルストレージから削除
        }
      }
    };

    // ローカルストレージから初期状態を設定
    const storedLoginStatus = localStorage.getItem('isLogin');
    if (storedLoginStatus === 'true') {
      setIsLogin(true);
    }

    checkAuthStatus();

    // 50分ごとに再確認
    const interval = setInterval(checkAuthStatus, 3000000);
    // クリーンアップ関数
    return () => clearInterval(interval);
  }, []);

  // ログインモーダルを開く
  const handleOpen = () => setOpen(true);
  // ログインモーダルを閉じる
  const handleClose = () => {
    setOpen(false);
  };
  
  // ログイン処理
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.status === 200) {
        setIsLogin(true);
        localStorage.setItem('isLogin', 'true');
        router.push('/dashboard');
        handleClose();
      }
    } catch (error) {
      console.error('Login failed:', error);
      setAuthError("Falscher Benutzername oder Passwort.");
    }
  };
  // ログアウト処理
  const logout = async () => {
    try {
      await axios.post('/api/logout');
      setIsLogin(false);
      localStorage.removeItem('isLogin');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // エラーハンドリング
    }
  };
  // Refresh取得処理
  const refreshAccessToken = async () => {
    try {
        const response = await axios.post('/api/refresh/');
        if (response.status === 200) {
          setIsLogin(true);
          localStorage.setItem('isLogin', 'true');
          router.push('/dashboard');
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
        setIsLogin(false);
        setAuthError("Unable to refresh token, please login again.");
    }
  };

  // サインアップ時用
  const checkAuthSignUp = async () => {
    try {
        const response = await axios.get('/api/checkauth/');
        if (response.status === 200) {
          setIsLogin(true);
          localStorage.setItem('isLogin', 'true');
          router.push('/dashboard');
        } else {
            setIsLogin(false);
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        if (error.response && error.response.status === 401) {
            // Attempt to refresh the token
            refreshAccessToken();
        } else {
            setIsLogin(false);
        }
    }
  };

  return (
    <AuthContext.Provider value={{
        isLogin,
        open,
        handleOpen,
        handleClose,
        login,
        logout,
        refreshAccessToken,
        checkAuthSignUp,
        authError
      }}>
      {children}
    </AuthContext.Provider>
  );
};