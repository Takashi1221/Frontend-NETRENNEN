import styles from '/styles/Results/RaceResults.module.css';

export function RaceInfo({ raceDetail }) {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoNumber}>{raceDetail[0].this_race_nr}R</div>
      <div className={styles.infoTextContainer}>
        <p className={styles.titleText}>{raceDetail[0].title}</p>
        <div className={styles.infoText}>
          <p className={styles.infoTextRightMargin}>{raceDetail[0].date} </p>
          <p className={styles.infoTextRightMargin}>{raceDetail[0].ort} </p>
          <p className={styles.infoTextRightMargin}>{raceDetail[0].time} </p>
        </div>
        <div className={styles.infoText}>
          <p className={styles.infoTextRightMargin}>{raceDetail[0].distanz} </p>
          <p className={styles.infoTextRightMargin}>{raceDetail[0].kategorie} </p>
          <p className={styles.infoTextRightMargin}>{raceDetail[0].boden}</p>
        </div>
      </div>
  </div>
  );
}
