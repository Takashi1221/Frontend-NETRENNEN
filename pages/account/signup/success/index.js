import { Header } from '/components/Header/Header'
import { LoginModal } from '/components/Header/LoginModal'
import { Footer } from '/components/Header/Footer'

import styles from '/styles/Account/SignUp.module.css'





const PaymentSuccess = () => {

    return (
        <div>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.signupBody}>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentSuccess;