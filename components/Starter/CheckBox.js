import { useState, useEffect } from 'react';
import styles from '/styles/Starter/HorseCards.module.css';

const CheckBox = ({ horseId }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // コンポーネントの初期化時にlocalStorageから状態を取得
    const savedState = localStorage.getItem(`checkBoxState_${horseId}`);
    if (savedState !== null) {
      setIsChecked(JSON.parse(savedState));
    }
  }, [horseId]);

  useEffect(() => {
    // 状態が変更されるたびにlocalStorageに保存
    localStorage.setItem(`checkBoxState_${horseId}`, JSON.stringify(isChecked));
  }, [isChecked, horseId]);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.checkBoxContainer} onClick={handleCheck}>
      {isChecked ? '✓' : ' '}
    </div>
  );
};

export default CheckBox;