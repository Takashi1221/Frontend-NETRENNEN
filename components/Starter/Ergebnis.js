import Link from 'next/link';
import StarsIcon from '@mui/icons-material/Stars';
import styles from '/styles/Starter/Ergebnis.module.css';

export function TodayErgebnis({ ergebnis, starters }) {
  // horse_idで結合させた配列を作成
  const starterErgebnis = ergebnis.map(eachErgebnis => {
    const matchingStarter = starters.find(e => e.horse_id === eachErgebnis.horse_id);
    return {
      ...eachErgebnis,
      ...matchingStarter
    };
  });


  return (
    <div>
      <div className={styles.tableWrapper}>
        <div className={styles.header}>
          <StarsIcon />
          <span>Ergebnis fixiert</span>
        </div>
        <table className={styles.ergebnisTable}>
          <thead>
            <tr>
              <th>Platz</th>
              <th>Box</th>
              <th>Nr.</th>
              <th>Name</th>
              <th>Alter</th>
              <th>Gew.</th>
              <th>Reiter</th>
              <th>Quote</th>
              <th>Besitzer</th>
              <th>Trainer</th>
            </tr>
          </thead>
          <tbody>
            {starterErgebnis.map((horse, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td>{horse.platz || 'N/A'}</td>
                <td>({horse.box || 'N/A'})</td>
                <td>{horse.number || 'N/A'}</td>
                <td><Link href={`/horse/${horse.horse_id}`} className={styles.linkStyle}>{horse.name}</Link></td>
                <td>{horse.alter || 'N/A'}</td>
                <td>{horse.gew || 'N/A'} kg</td>
                <td>{horse.jocky || 'N/A'}</td>
                <td>{horse.quote || 'N/A'}</td>
                <td>{horse.owner || 'N/A'}</td>
                <td>{horse.trainer || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.payContainer}>
        <div className={styles.payTableColumn}>Gewinn (Quote / 1€)</div>
        <div className={styles.payTableBody}>
            <div className={styles.payTitleContainer}>
              <p className={`${styles.payRow} ${styles.evenRow}`}>Sieg</p>
              <p className={`${styles.payRow} ${styles.oddRow}`}>Platz</p>
              <p className={`${styles.payRow} ${styles.evenRow}`}>Zweier</p>
              <p className={`${styles.payRow} ${styles.oddRow}`}>Dreier</p>
            </div>
            <div className={styles.payVolumeContainer}>
              <p className={`${styles.payRow} ${styles.evenRow}`}>---</p>
              <p className={`${styles.payRow} ${styles.oddRow}`}>---</p>
              <p className={`${styles.payRow} ${styles.evenRow}`}>---</p>
              <p className={`${styles.payRow} ${styles.oddRow}`}>---</p>
            </div>
        </div>
      </div>
    </div>
  );
}