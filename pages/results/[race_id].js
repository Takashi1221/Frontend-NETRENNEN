import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '/context/AuthContext';
import { Header } from '../../components/Header/Header';
import { LoginModal } from '../../components/Header/LoginModal';
import { RaceInfo } from '../../components/Results/RaceInfo';
import { RaceNumberTabs } from '../../components/Results/RaceNumberTabs';
import { ResultsTable } from '../../components/Results/PlatzTable';
import { Loading } from '../../components/Loading';
import { Footer } from '../../components/Header/Footer';
import styles from '/styles/Results/RaceResults.module.css';


function RaceResults() {
  const { isLogin } = useAuth();
  const router = useRouter();
  const { race_id } = router.query; // URLからrace_idを取得
  const [raceDetail, setRaceDetail] = useState(null); // レース詳細データを保持するための状態

  useEffect(() => {
    // ローカルストレージから初期状態を設定
    const storedLoginStatus = localStorage.getItem('isLogin');
    console.log(isLogin)
    console.log(storedLoginStatus)
    if (storedLoginStatus !== 'true') {
      router.push('/');
    }
  }, [isLogin, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/results/?race_id=${race_id}`);
        // レスポンスからデータをセット
        setRaceDetail(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    if (race_id) {
      fetchData();
    }
  }, [race_id]);

  if (!isLogin) {
    return null; // リダイレクトが完了するまで何も表示しない
  }

  if (!raceDetail || Object.keys(raceDetail).length === 0) {
    return (
      <div className={styles.body}>
        <Header />
        <LoginModal />
        <div>
          <p><Loading /></p>
        </div>
        <Footer />
      </div>
    );
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