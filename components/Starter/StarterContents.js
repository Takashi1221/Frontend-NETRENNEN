import styles from '/styles/Starter/Starter.module.css';
import { HorseCards } from './HorseCards';

export function StarterContents({ starters }) {
  return (
    <div className={styles.mainContainer}>
      <HorseCards starters={starters} />
    </div>
  );
}
