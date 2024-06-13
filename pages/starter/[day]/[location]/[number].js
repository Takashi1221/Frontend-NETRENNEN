import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '/context/AuthContext';
import { Header } from '../../../../components/Header/Header';
import { LoginModal } from '../../../../components/Header/LoginModal';
import { Footer } from '../../../../components/Header/Footer';
import { HowTo } from '../../../../components/Starter/Howto';
import { RaceNumberTabs } from '../../../../components/Starter/RaceNumberTabs';
import { HorseCardsCopy } from '../../../../components/Starter/HorseCards';
import { HorseCardsNotAuthed } from '../../../../components/Starter/HorseCardsNotAuth';
import { DataAnalysis } from '../../../../components/Starter/DataAnalysis';
import { Loading } from '../../../../components/Loading';
import QuizIcon from '@mui/icons-material/Quiz';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import styles from '/styles/Starter/Raceid.module.css';


const RaceCard = () => {
  const { isLogin } = useAuth();
  const router = useRouter();
  const { day, location, number } = router.query;
  const [raceList, setRaceList] = useState(null);
  const [thisRace, setThisRace] = useState(null);
  const [starters, setStarters] = useState(null);
  const [howToVisible, setHowToVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('letzte4Laufe');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // ローカルストレージから初期状態を設定
    const storedLoginStatus = localStorage.getItem('isLogin');
    console.log(isLogin)
    console.log(storedLoginStatus)
    if (storedLoginStatus !== 'true') {
      router.push('/');
    }
  }, [isLogin, router]);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await axios.get('/api/abocheck');
        setIsSubscribed(response.data.is_subscribed);
        console.log(response.data.is_subscribed)
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get(`/api/renntermine/?day=${day}&location=${location}`);
        setRaceList(response.data);
        
        // レースリストが取得できたら、routerのnumberに対応するデータをフェッチ
        if (response.data.length > 0 && number) {
            const matchingRace = response.data.find(race => race.number === parseInt(number));
            if (matchingRace) {
                const resStarter = await axios.get(`/api/starter/?race_id=${matchingRace.race_id}`);
                setStarters(resStarter.data);
                setThisRace(matchingRace);
                console.log(resStarter.data);
            }
          }
      } catch (error) {
        console.error("Error fetching race data:", error);
      }
    };

    if (day && location && number) {
      fetchRaces();
    }
  }, [day, location, number]);


  // アコーディオンの表示を切り替える関数
  const toggleHowToVisibility = () => {
    setHowToVisible(prevState => !prevState);
  };
  
  if (!thisRace) {
    return <Loading />;
  }

  if (!isLogin) {
    return null; // リダイレクトが完了するまで何も表示しない
  }

  const renderTabContent = () => {
    if (activeTab === 'letzte4Laufe') {
      return thisRace.number > 3 && !isSubscribed ? (
        <HorseCardsNotAuthed starters={starters} />
      ) : (
        <HorseCardsCopy starters={starters} />
      );
    } else if (activeTab === 'datenanalyse') {
      return <DataAnalysis thisRace={thisRace} starters={starters} />;
    }
  };


  return (
    <div>
      <div className={styles.body}>
        <Header />
        <LoginModal />
        <div className={styles.pageContainer}>
          <RaceNumberTabs sameDayRaces={raceList} thisRace={thisRace} />
          <div className={styles.headerBackground}></div>
          <div className={styles.infoContainer}>
            <p className={styles.raceTitle}>
              <span className={styles.raceTitleNumber}>{thisRace.number}R</span>
              <span>{thisRace.title}</span>
            </p>
            <p className={styles.infoDetails}>{thisRace.start} / {thisRace.distance} / {thisRace.categorie}</p>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.tabHint}>
              <QuizIcon />
              <div>Seitenanleitung</div>
              <button onClick={toggleHowToVisibility}>
                {howToVisible ? <CloseIcon /> : <KeyboardArrowDownIcon />}
              </button>
            </div>
            {/* チュートリアルコンテナ */}
            {howToVisible && <HowTo />}
            <div className={styles.tab}>
              <div className={styles.tabLabel} onClick={() => setActiveTab('letzte4Laufe')}>
                <BedroomBabyIcon />Letzte 4 Läufe
              </div>
              <div className={styles.tabLabel} onClick={() => setActiveTab('datenanalyse')}>
                <AnalyticsIcon />Datenanalyse
              </div>
            </div>
            {renderTabContent()}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RaceCard;