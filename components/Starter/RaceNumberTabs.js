import Link from 'next/link';
import styles from '/styles/Starter/Raceid.module.css';

export function RaceNumberTabs({ sameDayRaces }) {
  return (
    <div className={styles.racenumberContainer}>
      {sameDayRaces.map((race) => (
        <Link key={race.id} href={`/starter/${race.race_id}`} passHref>
          <button className={styles.racenumberButton}>
            {race.number}R
          </button>
        </Link>
      ))}
      {/* 直近レース一覧へ戻るボタンを作成 */}
      <Link href="/starter/" passHref>
        <p className={styles.racenumberButton}>return</p>
      </Link>
    </div>
  );
}
