import React, { useState, useMemo, useEffect } from 'react'; 
import Link from 'next/link';
import { useRacelist } from '../../context/RacelistContext';
import styles from '/styles/Home/Main2.module.css'; 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Loading } from '../Loading';


export function Main2() {

  const { raceList: contextRaceList, uniqueDates } = useRacelist();
  const [value, setValue] = useState(0);
  const [raceList, setRaceList] = useState(contextRaceList);

  useEffect(() => {
    if (!contextRaceList) {
      // raceListがステートから失われた場合ローカルストレージから取得
      // するとContextの方でuseEffectの依存配列が発火する
      const storedRaceList = localStorage.getItem('raceList');
      if (storedRaceList) {
        setRaceList(JSON.parse(storedRaceList));
      }
    }
  }, [contextRaceList]);
  
  // タブ変更時に呼び出される関数
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // タブ選択された日付に一致するデータをフィルタリング
  const filteredDataByDate = useMemo(() => {
    const targetRaceList = raceList || contextRaceList;
    if (!targetRaceList) return [];
    return targetRaceList.filter(data => data.date === uniqueDates[value]);
  }, [raceList, contextRaceList, uniqueDates, value]);

  // その日の競馬場ごとにデータをグルーピング
  const groupedByLocation = useMemo(() => filteredDataByDate.reduce((acc, data) => {
    if (!acc[data.location]) {
      acc[data.location] = [];
    }
    acc[data.location].push(data);
    return acc;
  }, {}), [filteredDataByDate]);

  if (!filteredDataByDate || filteredDataByDate.length === 0) {
    return <Loading />;  // セーフガードを追加
  }


  return (
    <div className={styles.mainContainer}>
      <div className={styles.upperContainer}>
        <div className={styles.tabColor}>
          <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
            <Tabs 
              value={value} 
              onChange={handleChange} 
              variant="scrollable" 
              scrollButtons="auto" 
              aria-label="day tabs" 
              TabIndicatorProps={{ style: { backgroundColor: 'green' } }} // 下線の色をカスタム
            >
              {uniqueDates.map((date, index) => (
                <Tab 
                  key={index} 
                  label={new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })} 
                  sx={{
                    fontFamily: "'Nokora', sans-serif",
                    fontSize: '1rem',
                    // 選択されていないタブのテキスト色をグレーに設定
                    color: 'rgba(94, 100, 97, 0.786)',
                    // 選択されているタブのテキスト色を赤に設定
                    '&.Mui-selected': {
                      color: 'rgba(4, 71, 32)',
                    },
                  }}
                  // リップルの色をカスタム
                  TouchRippleProps={{ style: { color: 'rgba(109, 205, 109, 0.5)' } }}
                />
              ))}
            </Tabs>
          </Box>
        </div>
        <Link href={`/starter/kalender`}>
          <div className={styles.toScheduleText}>
            <p className={styles.linkStyle}>Rennkalender</p>
            <p><PlayArrowIcon fontSize='small' /></p>
          </div>
        </Link>
      </div>
      {/* 選択されたデータを表示する下部コンテナ */}
      <div className={styles.lowerContainer}>
        {Object.entries(groupedByLocation).map(([location, data], index) => (
          <div key={index} className={styles.locationContainer}>
            <div className={styles.locationText}>{location}</div>
            {data.sort((a, b) => a.number - b.number).map((item) => (
              <Link href={`/starter/${item.race_id}`} key={item.number} className={styles.raceContainer}>
                <div className={styles.raceNumberButton}>{item.number}R</div>
                <div className={styles.raceInfoSpace}>
                  <div className={`${styles.rowOne} ${styles.linkStyle}`}>{item.categorie}</div>
                  <div className={styles.rowTwo}>
                    <p className={styles.marginRight}>{item.start}</p>
                    <p className={styles.marginRight}>{item.distance}</p>
                    <p>{item.starters} str.</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )  
}
