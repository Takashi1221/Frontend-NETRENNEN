import { Header } from '/components/Header'
import { LoginModal } from '/components/Home/LoginModal'
import { Footer } from '/components/Footer'

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