import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '/context/AuthContext';
import { Header } from '../../../components/Header/Header';
import { LoginModal } from '../../../components/Header/LoginModal';
import { Footer } from '../../../components/Header/Footer';
import { RaceNumberTabs } from '../../../components/Starter/RaceNumberTabs';
import { HorseCardsCopy } from '../../../components/Starter/HorseCards';
import { Loading } from '../../../components/Loading';
import QuizIcon from '@mui/icons-material/Quiz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import styles from '/styles/Starter/Raceid.module.css';
import { HowTo } from '../../../components/Starter/Howto';


const RaceComponent = () => {
  const { isLogin } = useAuth();
  const router = useRouter();
  const { day, location } = router.query;
  const [raceList, setRaceList] = useState(null);
  const [starters, setStarters] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [howToVisible, setHowToVisible] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      router.push('/');
    }
  }, [isLogin, router]);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get(`/api/renntermine/?day=${day}&location=${location}`);
        setRaceList(response.data);
        
        // レースリストが取得できたら、デフォルトのレース番号に対応するデータをフェッチ
        if (response.data.length > 0) {
          const defaultRace = response.data.find(race => race.number === 1);
          if (defaultRace) {
            handleRaceSelect(defaultRace.race_id, 1); // デフォルト1R目でonRaceSelectを呼び出し
            setSelectedRace(defaultRace);
            console.log(defaultRace)
          }
        }

      } catch (error) {
        console.error("Error fetching race data:", error);
      }
    };

    if (day && location) {
      fetchRaces();
    }
  }, [day, location]);


  const handleRaceSelect = async (raceId) => {
    try {
      const response = await axios.get(`/api/starter/?race_id=${raceId}`);
      setStarters(response.data);

      const thisRace = await raceList.find(race => race.race_id === raceId);
      setSelectedRace(thisRace);
      console.log(thisRace)

    } catch (error) {
      console.error("Error fetching starters data:", error);
    }
  };

  // アコーディオンの表示を切り替える関数
  const toggleHowToVisibility = () => {
    setHowToVisible(prevState => !prevState);
  };
  
  if (!raceList) {
    return <Loading />;
  }

  if (!isLogin) {
    return null; // リダイレクトが完了するまで何も表示しない
  }

  return (
    <div>
      <div className={styles.body}>
        <Header />
        <LoginModal />
        <div className={styles.pageContainer}>
          <RaceNumberTabs sameDayRaces={raceList} onRaceSelect={handleRaceSelect} />
          <div className={styles.headerBackground}></div>
          <div className={styles.infoContainer}>
            <p className={styles.raceTitle}>
              <span className={styles.raceTitleNumber}>{selectedRace.number}R</span>
              <span>{selectedRace.title}</span>
            </p>
            <p className={styles.infoDetails}>{selectedRace.start} / {selectedRace.distance} / {selectedRace.categorie}</p>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.tab}>
              <div className={styles.tabLabel}>Letzte 4 Läufe</div>
              <div className={styles.tabHint}>
                <QuizIcon />
                <div>Seitenanleitung</div>
                <button onClick={toggleHowToVisibility}>
                  {howToVisible ? <CloseIcon /> : <KeyboardArrowDownIcon />}
                </button>
              </div>
            </div>
            {howToVisible && <HowTo />}
            {/* 馬柱コンテナ */}
            <HorseCardsCopy starters={starters} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RaceComponent;