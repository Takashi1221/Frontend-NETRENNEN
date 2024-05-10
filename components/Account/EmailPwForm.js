import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from '/styles/Account/ProgressSteps.module.css'



export const EmailAndPasswordForm = ({ onSubmit }) => {
    // 内部状態としてのフォームデータ
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div>
                <p className={styles.formTitle}>NETRENNEN</p>
                <p className={styles.formDiscription}>Erstellen Sie ein NETRENNEN-Konto, um die besten Pferderennen auf Ihrem Desktop oder Smartphone zu erleben!</p>
            </div>
            <div>
                <form onSubmit={handleSubmit} className={styles.formMainContainer}>
                    <div className={styles.formDiscription}>E-mail</div>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputStyle} 
                    />
                    <div className={styles.formDiscription}>Passwort</div>
                    <div className={styles.inputContainer}>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.inputStyle} 
                        />
                        <button 
                            type="button" 
                            onClick={togglePasswordVisibility}
                            className={styles.toggleButton}
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </button>
                    </div>
                    <div className={styles.formDiscription}>Mindestens acht Zeichen und eine Zahl.</div>
                    <div className={styles.formDiscription}>Darf nicht mit Ihrer E-Mail-Adresse ähnlich sein.</div>
                    <button 
                        type="submit"
                        className={styles.weiterButtonStyle}
                        >
                            Weiter
                    </button>
                </form>
            </div>
            
        </div>
    )  
  }