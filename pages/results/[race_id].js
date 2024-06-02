import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Header } from '../../components/Header/Header';
import { LoginModal } from '../../components/Header/LoginModal';
import { RaceInfo } from '../../components/Results/RaceInfo';
import { RaceNumberTabs } from '../../components/Results/RaceNumberTabs';
import { ResultsTable } from '../../components/Results/PlatzTable';
import { Footer } from '../../components/Header/Footer';
import styles from '/styles/Results/RaceResults.module.css';



function RaceResults() {
  const router = useRouter();
  const { race_id } = router.query; // URLからrace_idを取得
  const [raceDetail, setRaceDetail] = useState(null); // レース詳細データを保持するための状態
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/results/?race_id=${race_id}`);
        // レスポンスからデータをセット
        setRaceDetail(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
        // エラーハンドリング
      } finally {
        setLoading(false);
      }
    };

    if (race_id) {
      fetchData();
    }
  }, [race_id]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.body}>
      <Header />
      <LoginModal />
      <div className={styles.pageContainer}>
        {/* レース番号タブ */}
        <RaceNumberTabs raceDetail={raceDetail} />
        {/* レース情報コンテナ */}
        <RaceInfo raceDetail={raceDetail} />  
        {/* レース結果テーブル */}
        <ResultsTable raceDetail={raceDetail} />
      </div>
      <Footer />
    </div>
  );
}

export default RaceResults;