import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from '/styles/Account/SignUp.module.css'

const countryList = [
    'Germany',
    'France',
    'Italy',
    'United Kingdom',
    'Ireland',
    'South Africa',
    'United States',
    'Canada',
    'Brazil',
    'Australia',
    'New Zealand',
    'China',
    'Japan',
    'India',
    'Other Country'
];


export const EmailAndPasswordForm = ({ onSubmit, formData, handleChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.formContainer}>
            <div>
                <p className={styles.formTitle}>NETRENNEN-Konto erstellen</p>
            </div>
            <div>
                <form onSubmit={onSubmit} className={styles.formMainContainer}>
                    <div className={styles.formDiscription}>E-mail</div>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                        className={styles.inputStyleEmail} 
                        required 
                    />
                    <div className={styles.formDiscription}>Land</div>
                    <select 
                        value={formData.country} 
                        name="country"
                        onChange={handleChange}
                        className={styles.inputStyleEmail}
                        required 
                    >
                        <option value="" disabled></option>
                        {countryList.map((countryName, index) => (
                            <option key={index} value={countryName}>{countryName}</option>
                        ))}
                    </select>
                    <div className={styles.formDiscription}>Passwort</div>
                    <div className={styles.inputContainer}>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            name="password"
                            value={formData.password} 
                            onChange={handleChange}
                            className={styles.inputStylePW} 
                            required 
                        />
                        <button 
                            type="button" 
                            onClick={togglePasswordVisibility}
                            className={styles.toggleButton}
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </button>
                    </div>
                    <div className={styles.formDiscriptionLower}>Mindestens acht Zeichen und eine Zahl.</div>
                    <div className={styles.formDiscriptionLower}>Darf nicht mit Ihrer E-Mail-Adresse ähnlich sein.</div>
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