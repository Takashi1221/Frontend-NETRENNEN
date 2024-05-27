import { useState } from 'react';
import Link from 'next/link';
import styles from '/styles/Starter/Raceid.module.css';

export function RaceNumberTabs({ sameDayRaces, onRaceSelect }) {
  const [selectedRaceId, setSelectedRaceId] = useState(sameDayRaces[0].race_id);

  const handleRaceSelect = (raceId) => {
    setSelectedRaceId(raceId);
    onRaceSelect(raceId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.dayLocation}>{formatDate(sameDayRaces[0].date)} {sameDayRaces[0].location}</div>
      <div className={styles.racenumberContainer}>
        {sameDayRaces.map((race) => (
          <button 
            className={`${styles.racenumberButton} ${selectedRaceId === race.race_id ? styles.selectedButton : ''}`}
            onClick={() => handleRaceSelect(race.race_id)}
          >
            {race.number}R
          </button>
        ))}
        {/* 直近レース一覧へ戻るボタンを作成 */}
        <Link href="/dashboard" passHref>
          <p className={styles.returnButton}>zurück</p>
        </Link>
      </div>
    </div>
  );
}
