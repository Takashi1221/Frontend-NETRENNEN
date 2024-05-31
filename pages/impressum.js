import React from 'react';
import { Header } from '../components/Header/Header';
import { LoginModal } from '../components/Header/LoginModal';
import { Footer } from '../components/Header/Footer';
import styles from '/styles/ImpressumDaten.module.css';

export default function Impressum() {

  return (
    <div>
      <div className={styles.body}>
        <Header />
        <LoginModal />
        <div className={styles.pageContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.headerText}>Impressum</div>
          </div>
          <div className={styles.headerBackground}></div>
          <div>
            <p className={styles.impressumText}>Angaben gemäß § 5 TMG:</p>
            <p className={styles.impressumText}>Seitenbetreiber: Takashi Mio / 19 Hahnemannstraße, 04177 Leipzig</p>
            <p className={styles.impressumText}>Kontakt: t.mio@netrennen.com</p>
            <p className={styles.impressumText}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:  Takashi Mio / 19 Hahnemannstraße, 04177 Leipzig</p>
          </div>
          <div className={styles.headerContainer}>
            <div className={styles.headerText}>Aufsichtsbehörde</div>
          </div>
          <div className={styles.headerBackground}></div>
          <div>
            <p className={styles.impressumDisclaimer}>Unentschlossen</p>
          </div>
          <div className={styles.headerContainer}>
            
            <div className={styles.headerText}>Disclaimer</div>
          </div>
          <div className={styles.headerBackground}></div>
          <div className={styles.underTheBody}>
            <p className={styles.impressumHeader}>Haftung für Inhalte</p>
            <p className={styles.impressumDisclaimer}>Die auf dieser Website bereitgestellten Informationen dienen lediglich der Unterstützung des allgemeinen Vergnügens am Pferderennen und stellen keine spezifischen Wettempfehlungen oder finanzielle Beratung dar. Entscheidungen in Bezug auf Pferdewetten sollten ausschließlich auf Grundlage Ihrer eigenen Urteilsfähigkeit und auf eigenes Risiko getroffen werden. Wir übernehmen keine Verantwortung für die Ergebnisse von Wetten, die auf Basis der Informationen dieser Website getätigt werden. Bitte konsultieren Sie stets verlässliche Informationen und handeln Sie mit angemessener Vorsicht, bevor Sie Wetten platzieren.</p>
            <p className={styles.impressumHeader}>Haftung für Links</p>
            <p className={styles.impressumDisclaimer}>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
            <p className={styles.impressumHeader}>Urheberrecht</p>
            <p className={styles.impressumDisclaimer}>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}