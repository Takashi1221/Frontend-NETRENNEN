import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Header } from '../../../components/Header';
import { LoginModal } from '../../../components/Home/LoginModal';
import { Footer } from '../../../components/Footer';
import { RaceNumberTabs } from '../../../components/Starter/RaceNumberTabs';
import { HorseCardsCopy } from '../../../components/Starter/HorseCardsCopy';
import { Loading } from '../../../components/Loading';
import styles from '/styles/Starter/Raceid.module.css';


const RaceComponent = () => {
  const router = useRouter();
  const { day, location } = router.query;
  const [raceList, setRaceList] = useState(null);
  const [starters, setStarters] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);


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
  

  if (!raceList) {
    return <Loading />;
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
            <p className={styles.raceTitle}>{selectedRace.title}</p>
            <p className={styles.infoDetails}>{selectedRace.start} / {selectedRace.distance} / {selectedRace.categorie}</p>
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.tabLabel}>Letzte 4 Läufe</div>
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