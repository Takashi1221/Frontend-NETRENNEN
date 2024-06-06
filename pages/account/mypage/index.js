import React, { useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '/context/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Header } from '../../../components/Header/Header';
import { LoginModal } from '../../../components/Header/LoginModal';
import { Footer } from '../../../components/Header/Footer';
import styles from '/styles/Account/Mypage.module.css';


const MyPageTop = () => {
  const { isLogin } = useAuth();
  const [userEmail, setUserEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/');
    }
  }, [isLogin, router]);
  
  useEffect(() => {
    const checkEmail = async () => {
      try {
        const response = await axios.get('/api/checkemail/');
        if (response.status === 200) {
          const email = response.data.email;
          setUserEmail(email);
        } else {
          console.error('Failed to get user email:', response.status);
        }
      } catch (error) {
        console.error('Failed to get user email:', error);
      }
    };

    const checkSubscription = async () => {
      try {
        const response = await axios.get('/api/abocheck/');
        if (response.status === 200) {
          const { is_subscribed, subscription_id } = response.data;
          setIsSubscribed(is_subscribed);
          setSubscriptionId(subscription_id);
          console.log(subscription_id)
        } else {
          console.error('Failed to get subscription status:', response.status);
        }
      } catch (error) {
        console.error('Failed to get subscription status:', error);
      }
    };
  
    checkEmail();
    checkSubscription();
  }, []);

  const handleCancelSubscription = async () => {
    const email = userEmail;
    const message = `サブスク番号：${subscriptionId}を解約お願いします。`;

    const data = { email, message }; // 送信するデータ
    console.log('Sending:', data); // コンソールに送信データを出力

    try {
      const res = await fetch('/api/send-message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // 解約リクエストが成功した場合の処理
        alert('Cancellation request sent successfully.');
        router.push('/account/mypage/cancel');
      } else {
        console.error('Failed to send cancellation request:', res.status);
      }
    } catch (error) {
      console.error('Failed to send cancellation request:', error);
    }
  };

  if (!isLogin) {
    return null; // リダイレクトが完了するまで何も表示しない
  }

  return (
      <div className={styles.body}>
          <Header />
          <LoginModal />
          <div className={styles.pageContainer}>
              <div className={styles.headerContainer}>
                  <div className={styles.headerText}>Konto</div>
              </div>
              <div className={styles.headerBackground}></div>
              <div className={styles.mainContainer}>
                  <div className={styles.emailContainer}>
                      <div className={styles.leftContainer}>
                          <EmailIcon sx={{ 
                              fontSize: '1.8rem', 
                              color: '#3a3a3adc'
                          }} />
                          <div className={styles.email}>Email</div>
                      </div>  
                      <div className={styles.status}>{userEmail}</div>
                  </div>
                  <div className={styles.aboContainer}>
                      <div className={styles.leftContainer}>
                          <div><WorkspacePremiumIcon sx={{ 
                                  fontSize: '1.8rem', 
                                  color: '#3a3a3adc'
                              }} />
                          </div>
                          <div className={styles.abo}>Abo-Status</div>
                      </div>
                      <div className={styles.status}>
                      {isSubscribed ? 'netrennen Premium' : 'Basic (kostenlos)'}
                      </div>
                  </div>
                  <div className={styles.selectContainer}>
                      {isSubscribed ? (
                          <span className={styles.cancel} onClick={handleCancelSubscription}>
                              Abonnements kündigen
                          </span>
                      ) : (
                      <Link href={`/account/premium`}>
                          <span className={styles.upgrade}>Upgrade auf Premium</span>
                      </Link>
                      )}
                  </div>
              </div>
          </div>
          <Footer />
      </div>
  );
};

export default MyPageTop;