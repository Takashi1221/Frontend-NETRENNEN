import React from 'react';

import { HeaderLanding } from '../../../components/HeaderLanding';
import { LoginModal } from '../../../components/Home/LoginModal';
import { EmailAndPasswordForm } from '../../../components/Account/EmailPwForm';
import styles from '/styles/Account/SignUp.module.css'


const SignUp = () => {


    return (
        <div className={styles.backgroundSlider}>
            <HeaderLanding />
            <LoginModal />
            <div className={styles.backgroundContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.leftTextSpace}>
                        <h2>netrennen</h2>
                        <ul className={styles.bulletList}>
                            <li>Nach der Registrierung können Sie den Dienst sofort kostenlos nutzen.</li>
                            <li>Umfangreiche Informationen zu den Rennleistungen und Abstammungen der Pferde.</li>
                            <li>Sie können auch Nachrichtenartikel lesen.</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <EmailAndPasswordForm />
                </div>
            </div>
        </div>
    );
};

export default SignUp;