import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '/styles/Starter/Raceid.module.css';

export function RaceNumberTabs({ raceDetail }) {
  
  const [uniqueRecords, setUniqueRecords] = useState([]);
  const [selectedRaceId, setSelectedRaceId] = useState(raceDetail[0].race_id);


  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // ここでraceDetailからdateとortを取得して、パラメータとしてバックエンドに送る
        const { date, ort } = raceDetail[0]; // この行はraceDetailの構造に基づいて適宜調整してください
        const response = await axios.get('/api/racenumber/', { params: { date, ort } });
        const records = response.data;
        // recordsから重複するrace_idを排除
        const unique = {};
        records.forEach(record => {
          unique[record.race_id] = record;
        });

        // Object.values()を使ってuniqueオブジェクトの値からなる配列を取得
        let sortedRecords = Object.values(unique);
        // this_race_nrプロパティに基づいて昇順にソート
        sortedRecords.sort((a, b) => a.this_race_nr - b.this_race_nr);

        // 状態を更新
        setUniqueRecords(sortedRecords);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };
    // 関数を実行してデータを取得
    fetchRecords();
  }, [raceDetail]);

  const handleRaceSelect = (raceId) => {
    setSelectedRaceId(raceId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.dayLocationContainer}>
        <p className={styles.dayLocation}>{formatDate(raceDetail[0].date)} {raceDetail[0].ort}</p>
      </div>
      <div className={styles.racenumberContainer}>
        {uniqueRecords.map((record, index) => (
          <Link key={record.race_id} href={`/results/${record.race_id}`} passHref>
            <button 
            className={`${styles.racenumberButton} ${selectedRaceId === record.race_id ? styles.selectedButton : ''}`}
            onClick={() => handleRaceSelect(record.race_id)}
            >
              {index + 1}R
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
