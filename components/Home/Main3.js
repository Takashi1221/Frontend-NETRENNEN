import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { useRacelist } from '../../context/RacelistContext';
import styles from '/styles/Starter/Starter.module.css'

import { Loading } from '../Loading';


export function Main3() {
  const { raceList: contextRaceList } = useRacelist();
  const [raceList, setRaceList] = useState(contextRaceList);
  const [sortedAndMaxNumberRaces, setSortedAndMaxNumberRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!contextRaceList) {
      const storedRaceList = localStorage.getItem('raceList');
      if (storedRaceList) {
        setRaceList(JSON.parse(storedRaceList));
      }
    } else {
      setRaceList(contextRaceList);
    }
  }, [contextRaceList]);

  useEffect(() => {
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
