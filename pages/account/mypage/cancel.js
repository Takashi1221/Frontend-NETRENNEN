import { Header } from '/components/Header/Header';
import { LoginModal } from '/components/Header/LoginModal';
import { Footer } from '/components/Header/Footer';
import styles from '/styles/Account/AfterStripe.module.css';


const AboCancel = () => {

    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.textContainer}>
                    <h2>Ihre Anfrage zur Kündigung des Abonnements wurde eingereicht</h2>
                    <p> Sobald die Kündigung abgeschlossen ist, werden wir Sie per E-Mail benachrichtigen.</p> 
                    <p>Normalerweise wird die Kündigung innerhalb von 24 Stunden abgeschlossen.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboCancel;