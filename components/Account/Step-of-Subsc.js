import Link from 'next/link'
import { CheckOut } from '../Payment/CheckoutForm'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckIcon from '@mui/icons-material/Check';
import styles from '/styles/Account/ChoseSubsc.module.css'


export const SubscriptionOption = () => {

    return (
        <div>
            <div>
                <p className={styles.pageTitle}>Kontoregistrierung fertig!</p>
                <p className={styles.pageDiscription}>Dann können Sie einen Nutzungsplan auswählen.</p>
            </div>
            <div className={styles.pageMainContainer}>
                <div className={styles.subscContainer1}>
                    <div className={styles.dummyFlame}></div>
                    <div className={styles.priceContainer}>
                        <p className={styles.priceHeaderText}>Basic</p>
                        <p className={styles.priceVolumeText}>€ 0,00</p>
                        <p className={styles.priceMonatText}>/Monat</p>
                    </div>
                    <div className={styles.aboButtonContainer}>
                        <p className={styles.aktuellerPlanButton}>Aktueller Plan</p>
                    </div>
                    <div className={styles.aboDiscriptionContainer}>
                        <div className={styles.aboDiscriptionLeftSpace}>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                        </div>
                        <div className={styles.aboDiscriptionRightSpace}>
                            <p className={styles.rowHight26}>Grundlegende Rennkarte</p>
                            <p className={styles.rowHight26}>Pedigree des Pferdes</p>
                            <p className={styles.rowHight26}>Artikel über Pferderennen</p>
                        </div>
                    </div>
                </div>
                <div className={styles.subscContainer2}>
                    <div className={styles.beliebtFlame}>Am beliebtesten!</div>
                    <div className={styles.priceContainer}>
                        <p className={styles.priceHeaderText}>Premium</p>
                        <p className={styles.priceVolumeText}>€ 18,00</p>
                        <p className={styles.priceMonatText}>/Monat</p>
                    </div>
                    <div className={styles.aboButtonContainer}>
                        <p><CheckOut /></p>
                        <p className={styles.stripeDiscription}>Zur Stripe-Website gehen.</p>
                    </div>
                    <div className={styles.aboDiscriptionContainer}>
                        <div className={styles.aboDiscriptionLeftSpace}>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                            <p className={styles.rowHight26}><CheckIcon sx={{ fontSize: '1.1rem', paddingBottom: '5px', color: 'rgba(4, 34, 6, 0.86)' }}/></p>
                        </div>
                        <div className={styles.aboDiscriptionRightSpace}>
                            <p className={styles.rowHight26}>Professionelle Rennkarten</p>
                            <p className={styles.rowHight26}>Datenanalyse</p>
                            <p className={styles.rowHight26}>Pedigree des Pferdes</p>
                            <p className={styles.rowHight26}>Leistung des Pferdes</p>
                            <p className={styles.rowHight26}>Artikel über Pferderennen</p>
                            <p className={styles.rowHight26}>Viele zukünftige Ergänzungen</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Link href={`/account/signup/free`}>
                    <button
                    variant="outlined"
                    className={styles.weiterButtonStyle}
                    >
                        <RocketLaunchIcon sx={{ 
                                paddingRight: '5px',
                                paddingBottom: '5px',
                                color: 'rgba(4, 34, 6, 0.86)'
                            }}/>
                        Weiterhin kostenlos nutzen!
                    </button>
                </Link>
            </div>
        </div>
    )  
}