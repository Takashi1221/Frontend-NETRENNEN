import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Contextを定義します
const RacelistContext = createContext();
export const useRacelist = () => useContext(RacelistContext);

// 以下、アプリケーション全体への共有内容
export const RacelistProvider = ({ children }) => {

  const [raceList, setRacelist] = useState(null);
  const [starters, setStarters] = useState(null);
  const [uniqueDates, setUniqueDates] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          // 最新の開催データをフェッチ
          const [respenseRace, responseStarter] = await Promise.all([
            axios.get('/api/renntermine/'),
            axios.get('/api/starter/')
          ]);
          setRacelist(respenseRace.data);
          setStarters(responseStarter.data);
          
          // ユニークな日付を獲得
          const dates = Array.from(new Set(respenseRace.data.map(item => item.date)))
            .sort((a, b) => new Date(a) - new Date(b));
          setUniqueDates(dates);

          // ローカルストレージにもデータを保存
          localStorage.setItem('raceList', JSON.stringify(respenseRace.data));
          localStorage.setItem('starters', JSON.stringify(responseStarter.data));
          localStorage.setItem('uniqueDates', JSON.stringify(dates));
          
        } catch (error) {
          console.error("レース一覧の取得に失敗しました:", error);
        }
      };
      
      if (!raceList) {
        fetchData();
      }
  }, [raceList]);
  console.log(raceList);


  return (
    <RacelistContext.Provider value={{ 
        raceList,
        uniqueDates,
        starters,
      }}>
      {children}
    </RacelistContext.Provider>
  );
};