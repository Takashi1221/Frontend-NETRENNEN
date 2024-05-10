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
            setIsLogin(response.data.is_authenticated);
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
      console.log(response.data); // ここでレスポンスの中身を確認
      localStorage.setItem('token', response.data.access); // トークンをローカルストレージに保存
      localStorage.setItem('refreshToken', response.data.refresh);
      setIsLogin(true);
      handleClose();
    } catch (error) {
      console.error('Login failed:', error);
      setAuthError("Falscher Benutzername oder Passwort.");
    }
  };
  // ログアウト処理
  const logout = async () => {
    try {
      await axios.post('/api/logout');
      localStorage.removeItem('token'); // トークンをローカルストレージから削除
      setIsLogin(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // エラーハンドリング
    }
  };
  // Refresh取得処理
  const refreshAccessToken = async () => {
    try {
        const response = await axios.post('/api/refresh/');
        // Assuming the new access and refresh tokens are automatically set in HTTP-only Cookies
        setIsLogin(true);
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
        setIsLogin(response.data.is_authenticated);
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