import { Header } from '/components/Header'
import { LoginModal } from '/components/Home/LoginModal'
import { ProgressSteps } from '/components/Account/ProgressSteps'
import { Footer } from '/components/Footer'
import styles from '/styles/Account/SignUp.module.css'


const SignUp = () => {


    return (
        <div>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.signupBody}>
                    <ProgressSteps />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;