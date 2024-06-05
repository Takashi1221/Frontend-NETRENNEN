import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Header } from '/components/Header/Header';
import { LoginModal } from '/components/Header/LoginModal';
import { Footer } from '/components/Header/Footer';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '/styles/Account/AfterStripe.module.css';


// Stripeのページからキャンセルするとこのページを表示→リダイレクトする
const PayErrorPage = () => {
    
    // 6秒後にリダイレクトする
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 6000); // 6秒
        // タイマーをクリアする
        return () => clearTimeout(timer);
    }, []); // 空の依存配列を指定して初回のみ実行
    

    async function handleCheckout() {
        const res = await fetch('/api/stripe-session', {
          method: 'POST',
        });
        const { sessionId } = await res.json();
        if (res.ok) {
          // Stripe Checkoutページへリダイレクト
          const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
          stripe.redirectToCheckout({ sessionId });
        } else {
          console.error('Failed to create checkout session.');
        }
      }

    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.textContainer}>
                    <h2>Die Zahlung wurde nicht abgeschlossen</h2>
                    <p> Bitte warten Sie ein paar Sekunden, während wir die Seite umleiten....</p>
                </div>
                <div className={styles.loadingContainer}>
                    <Stack sx={{ color: 'grey.500', alignItems: 'center' }} spacing={2}>
                        <Stack direction="row" spacing={2}>
                        <CircularProgress color="success" />
                        </Stack>
                    </Stack>
                </div>
                <div className={styles.returnStripeContainer}>
                    <p onClick={handleCheckout} className={styles.returnStripeButton}>
                        Zahlungsseite erneut aufrufen
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PayErrorPage;