import EmailIcon from '@mui/icons-material/Email';
import LockResetIcon from '@mui/icons-material/LockReset';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import { Header } from '../../../components/Header';
import { LoginModal } from '../../../components/Home/LoginModal';
import { Footer } from '../../../components/Footer';
import styles from '/styles/Account/Mypage.module.css'



const NewsTop = () => {

    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerText}>Konto</div>
                </div>
                <div className={styles.headerBackground}></div>
                <div className={styles.bodyContainer}>
                    <div className={styles.contentHeader}> ABO Status</div>
                    <div className={styles.contentContainer}>
                        <p>
                            <WorkspacePremiumIcon sx={{ 
                                marginLeft: '1vw',
                                fontSize: '2.5vw', 
                                color: '#122315'
                            }} />
                        </p>
                        <p className={styles.contentTextSpace}>Netrennen Premium</p>
                    </div>
                    <div className={styles.contentHeader}>Änderung der Registrierungsinformationen</div>
                    <div className={styles.contentContainer}>
                        <p>
                            <EmailIcon sx={{ 
                                marginLeft: '1vw',
                                fontSize: '2.5vw', 
                                color: '#122315'
                            }} />
                        </p>
                        <p className={styles.contentTextSpace}>Änderung der E-Mail Adresse</p>
                    </div>
                    <div className={styles.contentContainer}>
                        <p><LockResetIcon sx={{ 
                                marginLeft: '1vw',
                                fontSize: '2.5vw', 
                                color: '#122315'
                            }} />
                        </p>
                        <p className={styles.contentTextSpace}>Passwort ändern</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewsTop;