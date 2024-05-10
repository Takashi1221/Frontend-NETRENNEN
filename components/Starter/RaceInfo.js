import styles from '/styles/Starter/Raceid.module.css';

export function RaceInfo({ raceDetail }) {
  return (
    <div className={styles.raceinfoContainer}>
      <div className={styles.thisraceNumber}>{raceDetail.number}R</div>
      <div className={styles.raceinfoText}>
        <p className={styles.raceTitle}>{raceDetail.title}</p>
        <div className={styles.raceDetails}>
          <p className={styles.itemRightMargin}>{raceDetail.start} </p>
          <p className={styles.itemRightMargin}>{raceDetail.distance} </p>
          <p className={styles.itemRightMargin}>{raceDetail.categorie} </p>
          <p>{raceDetail.starters} strs.</p>
        </div>
      </div>
  </div>
  );
}
