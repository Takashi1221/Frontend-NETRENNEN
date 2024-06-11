import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/context/AuthContext';
import { Header } from "../components/Header/Header";
import { LoginModal } from '../components/Header/LoginModal';
import { Footer } from "../components/Header/Footer";
import styles from '/styles/Company/Aboutus.module.css';


const AboutUs = () => {
    const { isLogin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // ローカルストレージから初期状態を設定
        const storedLoginStatus = localStorage.getItem('isLogin');
        console.log(isLogin)
        console.log(storedLoginStatus)
        if (storedLoginStatus !== 'true') {
          router.push('/');
        }
      }, [isLogin, router]);

    if (!isLogin) {
        return null; // リダイレクトが完了するまで何も表示しない
    }
    
    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerText}>Wir über uns</div>
                </div>
                <div className={styles.headerBackground}></div>
                <div className={styles.bodyContainer}>
                    <div className={styles.aboutTextContainer}>
                        <p className={styles.textSpace}>
                            NETRENNEN wurde im Mai 2024 unter dem Motto &quot;Pferderennen sind die beste Unterhaltung der Welt&quot; gestartet.
                        </p>
                        <p className={styles.textSpace}>
                            Hier in Deutschland zieht jede Rennbahn mehr als 10.000 Zuschauer pro Tag an, die ihre Begeisterung zeigen. Viele Menschen erleben die Kraft, Pferde live laufen zu sehen und die Freude, mit Familie und Freunden darüber zu sprechen.
                        </p>
                        <p className={styles.textSpace}>
                            Andererseits interessieren sich selbst unter denjenigen, die sich für Pferderennen interessieren und die Rennbahnen besucht haben, nur wenige dafür, welche Art von Rennen in einer anderen Stadt dieses Landes ausgetragen wird und welche Pferde dort laufen.
                        </p>
                        <p className={styles.textSpace}>
                            Wir wollen die Entwicklung der deutsche Pferderenn unterstützen, indem wir eine Plattform zur Verfügung stellen, über die sich viele Menschen einfach online über Pferderennen informieren können.
                        </p>
                    </div>
                    <div className={styles.aboutImgContainer}></div>
                </div>
                <div className={styles.bodyContainerMobil}>
                    <div className={styles.aboutImgContainerMobil}></div>
                    <div className={styles.aboutTextContainerMobil}>
                        <p className={styles.textSpace}>
                            NETRENNEN wurde im Mai 2024 unter dem Motto &quot;Pferderennen sind die beste Unterhaltung der Welt&quot; gestartet.
                        </p>
                        <p className={styles.textSpace}>
                            Hier in Deutschland zieht jede Rennbahn mehr als 10.000 Zuschauer pro Tag an, die ihre Begeisterung zeigen. Viele Menschen erleben die Kraft, Pferde live laufen zu sehen und die Freude, mit Familie und Freunden darüber zu sprechen.
                        </p>
                        <p className={styles.textSpace}>
                            Andererseits interessieren sich selbst unter denjenigen, die sich für Pferderennen interessieren und die Rennbahnen besucht haben, nur wenige dafür, welche Art von Rennen in einer anderen Stadt dieses Landes ausgetragen wird und welche Pferde dort laufen.
                        </p>
                        <p className={styles.textSpace}>
                            Wir wollen die Entwicklung der deutsche Pferderenn unterstützen, indem wir eine Plattform zur Verfügung stellen, über die sich viele Menschen einfach online über Pferderennen informieren können.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;