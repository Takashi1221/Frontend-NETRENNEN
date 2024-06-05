import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Header } from '/components/Header/Header';
import { LoginModal } from '/components/Header/LoginModal';
import { Footer } from '/components/Header/Footer';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '/styles/Account/AfterStripe.module.css';


const PaymentSuccess = () => {
    // 5秒後にリダイレクトする
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 5000); // 5秒
        // タイマーをクリアする
        return () => clearTimeout(timer);
    }, []); // 空の依存配列を指定して初回のみ実行

    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.textContainer}>
                    <h2>Vielen Dank für Ihren Abonnementkauf!</h2>
                    <p> Sie werden in 5 Sekunden weitergeleitet. Bitte haben Sie einen Moment Geduld.</p>
                </div>
                <div className={styles.loadingContainer}>
                    <Stack sx={{ color: 'grey.500', alignItems: 'center' }} spacing={2}>
                        <Stack direction="row" spacing={2}>
                        <CircularProgress color="success" />
                        </Stack>
                    </Stack>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default PaymentSuccess;