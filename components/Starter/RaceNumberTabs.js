import Link from 'next/link';
import styles from '/styles/Starter/Raceid.module.css';

export function RaceNumberTabs({ sameDayRaces, thisRace }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.dayLocationContainer}>
        <p className={styles.dayLocation}>{formatDate(sameDayRaces[0].date)} {sameDayRaces[0].location}</p>
        <Link href="/dashboard" passHref>
          <p className={styles.hiddenReturnButton}>zurück</p>
        </Link>
      </div>
      <div className={styles.racenumberContainer}>
        {sameDayRaces.map((race, index) => (
          <Link key={index} href={`/starter/${race.date}/${encodeURIComponent(race.location)}/${race.number}`}>
            <button 
              className={`${styles.racenumberButton} ${thisRace.race_id === race.race_id ? styles.selectedButton : ''}`}
            >
              {race.number}R
            </button>
          </Link>
        ))}
        {/* 直近レース一覧へ戻るボタンを作成 */}
        <Link href="/dashboard" passHref>
          <p className={styles.returnButton}>zurück</p>
        </Link>
      </div>
    </div>
  );
}
