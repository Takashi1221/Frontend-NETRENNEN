import Link from 'next/link';
import styles from '/styles/Results/RaceResults.module.css';


export function ResultsTable({ raceDetail }) {

    return (
        <div>
            <div className={styles.resultsTableContainer}>
                <div className={styles.resultsTableColumns}>
                    <p className={styles.rowWidth35}>Pl.</p>
                    <p className={styles.rowWidth200}>Name</p>
                    <p className={styles.rowWidth35}>Nr.</p>
                    <p className={styles.rowWidth35}>Box</p>
                    <p className={styles.rowWidth80}>Gew.</p>
                    <p className={styles.rowWidth120}>Abstand</p>
                    <p className={styles.rowWidth80}>Zeit</p>
                    <p className={styles.rowWidth180}>Reiter</p>
                    <p className={styles.rowWidth190}>Trainer</p>
                    <p className={styles.rowWidth190}>Besitzer</p>
                    <p className={styles.rowWidth60}>Evq.</p>
                    <p className={styles.rowWidth80}>Preisgeld</p>
                </div>
                <div className={styles.resultsTableBody}>
                    {raceDetail.map((record, index) => (
                        <div className={styles.tableRowContainer} key={index}>
                            <p className={styles.rowWidth35}>{record.platz}</p>
                            <Link href={`/horse/${record.horse_id}`}>
                                <p className={styles.rowWidthName}>{record.name.slice(0, 22)}</p>
                            </Link>
                            <p className={styles.rowWidth35}>{record.number}</p>
                            <p className={styles.rowWidth35}>{record.box}</p>
                            <p className={styles.rowWidth80}>{record.gew.slice(0, 4)} kg</p>
                            <p className={styles.rowWidth120}>{record.abstand}</p>
                            <p className={styles.rowWidth80}>{record.race_time}</p>
                            <p className={styles.rowWidth180}>{record.reiter.slice(0, 22)}</p>
                            <p className={styles.rowWidth190}>{record.trainer.slice(0, 20)}</p>
                            <p className={styles.rowWidth190}>{record.besitzer.slice(0, 20)}</p>
                            <p className={styles.rowWidth60}>{record.evq}</p>
                            <p className={styles.rowWidth80}>{record.preisgeld}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.payContainer}>
                <div className={styles.payTableColumn}>Gewinn (Quote/1€)</div>
                <div className={styles.payTableBody}>
                    <div className={styles.payTitleContainer}>
                        <p className={styles.payRow}>Sieg</p>
                        <p className={styles.payRow}>Platz</p>
                        <p className={styles.payRow}>Zweier</p>
                        <p className={styles.payRow}>Dreier</p>
                    </div>
                    <div className={styles.payVolumeContainer}>
                        <p className={styles.payRow}>{raceDetail[0].pay_sieg}</p>
                        <p className={styles.payRow}>{raceDetail[0].pay_platz}</p>
                        <p className={styles.payRow}>{raceDetail[0].pay_zweier}</p>
                        <p className={styles.payRow}>{raceDetail[0].pay_dreier}</p>
                    </div>
                </div>
            </div>
        </div>

    );

}