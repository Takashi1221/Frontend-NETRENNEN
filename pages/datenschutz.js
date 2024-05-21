import React from 'react';
import { Header } from '/components/Header';
import { LoginModal } from '/components/Home/LoginModal';
import { Footer } from '/components/Footer';
import styles from '/styles/ImpressumDaten.module.css'

export default function Datenschutz() {

  return (
    <div>
      <div className={styles.body}>
        <Header />
        <LoginModal />
        <div className={styles.pageContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.headerText}>Datenschutzerklärung</div>
          </div>
          <div className={styles.headerBackground}></div>
          <div className={styles.bodyMainContainer}>
            <div className={styles.bodyHeaderText}>1. Datenschutz auf einen Blick</div>
            <p className={styles.bodysemiHeaderText}>Allgemeine Hinweise</p>
            <span className={styles.bodyChildText}>Diese Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.</span>
            <p className={styles.bodysemiHeaderText}>Datenerfassung auf unserer Website</p>
            <span className={styles.bodyChildText}>Verantwortlicher: Der Betreiber dieser Website ist verantwortlich für die Datenverarbeitung. Kontaktdaten finden Sie im Impressum.</span>
            <span className={styles.bodyChildText}>Erfassung Ihrer Daten: Ihre Daten werden erfasst, wenn Sie uns diese mitteilen, z.B. durch das Ausfüllen eines Kontaktformulars. Andere Daten werden automatisch durch IT-Systeme beim Besuch der Website erfasst (z.B. Browser, Betriebssystem).</span>
            <span className={styles.bodyChildText}>Nutzung Ihrer Daten: Ein Teil der Daten wird erhoben, um die fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</span>
            <p className={styles.bodysemiHeaderText}>Ihre Rechte</p>
            <span className={styles.bodyChildText}>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Sperrung oder Löschung Ihrer gespeicherten personenbezogenen Daten. Bei weiteren Fragen zum Datenschutz können Sie sich jederzeit an die im Impressum angegebene Adresse wenden.</span>
            <div className={styles.bodyHeaderText}>2. Allgemeine Hinweise und Pflichtinformationen</div>
            <p className={styles.bodysemiHeaderText}>Datenschutz</p>
            <span className={styles.bodyChildText}>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</span>
            <p className={styles.bodysemiHeaderText}>Hinweis zur verantwortlichen Stelle</p>
            <span className={styles.bodyChildText}>Der Betreiber dieser Website ist verantwortlich für die Datenverarbeitung. Kontaktdaten finden Sie im Impressum.</span>
            <p className={styles.bodysemiHeaderText}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</p>
            <span className={styles.bodyChildText}>Sie können eine bereits erteilte Einwilligung zur Datenverarbeitung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns.</span>
            <div className={styles.bodyHeaderText}>3. Datenerfassung auf unserer Website</div>
            <p className={styles.bodysemiHeaderText}>Cookies</p>
            <span className={styles.bodyChildText}>Unsere Website verwendet Cookies, um unser Angebot nutzerfreundlicher zu gestalten. Die meisten Cookies sind sogenannte „Session-Cookies“, die nach Ihrem Besuch automatisch gelöscht werden. Sie können Cookies in Ihrem Browser jederzeit löschen oder blockieren.</span>
            <p className={styles.bodysemiHeaderText}>Server-Log-Dateien</p>
            <span className={styles.bodyChildText}>Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (z.B. Browsertyp, Betriebssystem, Referrer URL, IP-Adresse). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.</span>
            <p className={styles.bodysemiHeaderText}>Kontaktformular</p>
            <span className={styles.bodyChildText}>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben inklusive der von Ihnen angegebenen Kontaktdaten zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</span>
            <p className={styles.bodysemiHeaderText}>Registrierung auf dieser Website</p>
            <span className={styles.bodyChildText}>Die bei der Registrierung angegebenen Daten werden ausschließlich für die Bereitstellung der NETRENNEN-Dienste verwendet.</span>
            <p className={styles.bodysemiHeaderText}>Zahlungen</p>
            <span className={styles.bodyChildText}>Die Zahlungen werden über eine Seite abgewickelt, die von einem Drittanbieter, Stripe, bereitgestellt wird. NETRENNEN speichert keine Zahlungsdaten wie Kreditkartennummern.</span>
            <div className={styles.bodyHeaderText}>4. Rechte der betroffenen Personen</div>
            <p className={styles.bodysemiHeaderText}>Auskunft, Sperrung, Löschung und Berichtigung</p>
            <span className={styles.bodyChildText}>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten sowie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.</span>
            <p className={styles.bodysemiHeaderText}>Recht auf Einschränkung der Verarbeitung</p>
            <span className={styles.bodyChildText}>Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, wenn bestimmte Voraussetzungen erfüllt sind.</span>
            <div className={styles.bodyHeaderText}>5. Widerspruch gegen Werbe-E-Mails</div>
            <span className={styles.bodyChildText}>Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen.</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}