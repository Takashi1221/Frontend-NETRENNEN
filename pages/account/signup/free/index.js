import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Header } from '/components/Header';
import { LoginModal } from '/components/Home/LoginModal';
import { FinishProgressSteps } from '/components/Account/FinishProgressSteps';
import { Footer } from '/components/Footer';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '/styles/Account/SignUp.module.css'

// サインアップ時に無料プランを選択すると表示されるページ
const NotPaiedButUseFree = () => {

    // 4秒後にリダイレクトする
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/starter');
        }, 4000); // 4秒
        // タイマーをクリアする
        return () => clearTimeout(timer);
    }, []); // 空の依存配列を指定して初回のみ実行

    return (
        <div>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.signupBody}>
                    <FinishProgressSteps />
                    <div className={styles.useFreeMainContainer}>
                        <div className={styles.useFreeHeader}>
                            Genieße NETRENNEN!
                        </div>
                        <div className={styles.useFreeBody}>
                            <p>Bitte warten Sie 5 Sekunden, </p>
                            <p>während wir die Seite umleiten....</p>
                        </div>
                        <div className={styles.loadingContainer}>
                            <Stack sx={{ color: 'grey.500', alignItems: 'center' }} spacing={2}>
                                <Stack direction="row" spacing={2}>
                                <CircularProgress color="success" />
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotPaiedButUseFree;