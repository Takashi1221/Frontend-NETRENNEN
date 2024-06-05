import { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styles from '/styles/Starter/HorseCards.module.css';

const CheckBox = ({ horseId }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // コンポーネントの初期化時にlocalStorageからチェック状態を取得
    const savedState = localStorage.getItem(`checkBoxState_${horseId}`);
    if (savedState !== null) {
      const { value } = JSON.parse(savedState);
      setIsChecked(value);  // `value`を直接使用してチェック状態を設定
    }
  }, [horseId]);

  useEffect(() => {
    // 状態が変更されるたびにLocalStorageに保存、ここで期限も設定
    const now = new Date();
    const expiry = now.getTime() + (30 * 24 * 60 * 60 * 1000); // 30日後に期限切れ
    const stateToSave = {
      value: isChecked,
      expiry: expiry
    };
    localStorage.setItem(`checkBoxState_${horseId}`, JSON.stringify(stateToSave));
  }, [isChecked, horseId]);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.checkBoxContainer} onClick={handleCheck}>
      {isChecked ? <CheckIcon sx={{ color: '#ff0095f0', fontSize: '36px', paddingBottom: '3px' }} /> : ' '}
    </div>
  );
};

export default CheckBox;