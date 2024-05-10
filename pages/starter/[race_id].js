import React from 'react';
import { useRouter } from 'next/router';
import styles from '/styles/Starter/Raceid.module.css'
import { useRacelist } from '../../context/RacelistContext';
import { Header } from '../../components/Header';
import { LoginModal } from '../../components/Home/LoginModal';
import { RaceNumberTabs } from '../../components/Starter/RaceNumberTabs';
import { RaceInfo } from '../../components/Starter/RaceInfo';
import { StarterContents } from '../../components/Starter/StarterContents';
import { Loading } from '../../components/Loading';


function RaceDetail() {
  const router = useRouter();
  const { race_id } = router.query; // URLからrace_idを取得
  const { raceList, starters } = useRacelist(); 

  if (!raceList || raceList.length === 0 || !starters || starters.length === 0 || !race_id) {
    return <Loading />;
  }

  // メニュー用に当レースと同じ開催のレース情報をフィルタリング
  const thisRaceInfo = raceList.filter(race => race.race_id === race_id);
  if (!thisRaceInfo.length) {
    return <div>No race found</div>;
  }
  const thisRace = thisRaceInfo[0];
  const thisStarters = starters.filter(starter => starter.race_id === race_id);
  const sameDayRaces = raceList.filter(race => race.date === thisRace.date && race.location === thisRace.location).sort((a, b) => a.number - b.number);


  return (
    <div>
      <Header />
      <LoginModal />
      {/* ページ大枠のメインコンテナ */}
      <div className={styles.mainContainer}>
        
        {/* レース番号タブ */}
        <RaceNumberTabs sameDayRaces={sameDayRaces} />

        {/* レース情報コンテナ */}
        <RaceInfo raceDetail={thisRace} />

        {/* 馬柱コンテナ */}
        <StarterContents starters={thisStarters} />

      </div>    
    </div>
  );
}

export default RaceDetail;