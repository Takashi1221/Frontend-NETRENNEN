import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Link from 'next/link';
import { Loading } from '../Loading';
import styles from '/styles/Starter/Starter.module.css';


export function RennTermine() {
  const [raceList, setRacelist] = useState(null);
  const [sortedAndMaxNumberRaces, setSortedAndMaxNumberRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 開催データをフェッチ
        const respense = await axios.get('/api/renntermine/');
        setRacelist(respense.data);
        
      } catch (error) {
        console.error("fault to get races:", error);
      }
    };
    if (!raceList) {
      fetchData();
    }
}, [raceList]);


  useEffect(() => {
    // 開催データを整形
    if (raceList && raceList.length > 0) {
      const races = raceList
        .sort((a, b) => a.date.localeCompare(b.date) || a.location.localeCompare(b.location))
        .reduce((acc, current) => {
          const foundIndex = acc.findIndex(item => item.date === current.date && item.location === current.location);
          if (foundIndex !== -1) {
            if (acc[foundIndex].number < current.number) {
              acc[foundIndex] = current;
            }
          } else {
            acc.push(current);
          }
          return acc;
        }, []);
      setSortedAndMaxNumberRaces(races);
      setIsLoading(false);
    }
  }, [raceList]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.main3Body}>
      <div className={styles.termineParentContainer}>
      {sortedAndMaxNumberRaces.map((race, index) => {
        // race.dateが文字列の場合、Dateオブジェクトに変換
        const date = new Date(race.date);
        const path = `/starter/${race.date}/${encodeURIComponent(race.location)}`;

        return (
          <Link key={index} href={path}>
            <div className={styles.termineChildContainer}>
              <p className={styles.termineDay}>{date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</p>
              <p className={styles.termineLocation}>{race.location}</p>
              <p className={styles.termineRaces}>{race.number} Rennen</p>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
  )  
}
