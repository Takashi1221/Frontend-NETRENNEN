import { useState } from 'react';
import styles from '/styles/Account/ProgressSteps.module.css'


export const AdditionalInfoForm = ({ onSubmit, onPrevStep }) => {
    const [nickname, setNickname] = useState('');
    const [age_group, setAgeGroup] = useState('');
    const [residence_area, setArea] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(nickname, age_group, residence_area);
    };

    const handlePrev = () => {
        onPrevStep();
    };


    return (
        <div>
            <div>
                <p className={styles.formTitle}>NETRENNEN</p>
                <p className={styles.formDiscription}>Teilen Sie uns Ihre Informationen mit, wir werden sie nicht für andere Zwecke als zur Verbesserung der NETRENNEN-Dienste verwenden.</p>
            </div>
            <div>
                <form onSubmit={handleSubmit} className={styles.formMainContainer}>
                    <div className={styles.formDiscription}>Nickname</div>
                    <input 
                        type="text" 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)}
                        className={styles.inputStyle} 
                    />
                    <div className={styles.formDiscription}>Maximal 15 Zeichen.</div>
                    <div className={styles.formDiscription}>Alter</div>
                    <div className={styles.inputContainer}>
                        <select 
                            type="text" 
                            value={age_group} 
                            onChange={(e) => setAgeGroup(e.target.value)}
                            className={styles.inputStyle} 
                        >
                            <option value="">▼ Bitte wählen Sie</option>
                            <option value="young">35 Jahre und jünger</option>
                            <option value="adult">36-55 Jahre </option>
                            <option value="senior">56 Jahre und älter</option>
                        </select>
                    </div>
                    <div className={styles.formDiscription}>Region/Stadt</div>
                    <input 
                        type="text" 
                        value={residence_area} 
                        onChange={(e) => setArea(e.target.value)}
                        className={styles.inputStyle} 
                    />
                    <div className={styles.formDiscription}>Z.B.  Berlin, Baden-Baden</div>
                    <button 
                        type="submit"
                        className={styles.weiterButtonStyle}
                        >
                            Konto Erstellen
                    </button>
                    <div className={styles.returnButtonStyle}>
                        <button onClick={handlePrev}>Zurück</button>
                    </div>
                </form>
            </div>


                

        </div>
    )  
}