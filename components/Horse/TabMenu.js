import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import { Loading } from '../Loading';
import styles from '/styles/Horse/HorsePage.module.css';


export function HorseMenuTabs() {
  const router = useRouter();
  const { horse_id } = router.query;
  const [horseData, setHorseData] = useState([]);
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeoutMessage, setTimeoutMessage] = useState('');

  // Tabsコンポーネントで使用する状態を定義
  const [tabIndex, setTabIndex] = useState(0);
  // タブ外からタブを選択するための関数
  const selectFormenTab = () => {
    setTabIndex(1);  // Formenタブのインデックス
  };
  const selectPedigreeTab = () => {
    setTabIndex(2);  // Pedigreeタブのインデックス
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const urls = [
          `/api/horseprofi/?horse_id=${horse_id}`,
          `/api/pedigree/?horse_id=${horse_id}`,
          `/api/horseeachresults/?horse_id=${horse_id}`
        ];

        const promises = urls.map(url => axios.get(url));
        const results = await Promise.all(promises);

        // データを二重配列として格納
        const formattedData = results.map(result => [result.data]);
        setHorseData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching horse data:', error);
        setLoading(false);
      } 
    };

    fetchData();

    // 7秒間はローディングを待つ
    const timer = setTimeout(() => {
      if (loading) {
        setTimeoutMessage('No Datei');
      }
    }, 7000);

    return () => clearTimeout(timer);

  }, [horse_id]);


  useEffect(() => {
    if (horseData.length > 0 && horseData[0].length > 0 && horseData[0][0].length > 0 && horseData[0][0][0].birth) {
      const currentYear = new Date().getFullYear();
      const birthYear = parseInt(horseData[0][0][0].birth, 10);
      if (!isNaN(birthYear)) {
        const horseAge = currentYear - birthYear;
        setAge(horseAge);
      }
    }
  }, [horseData]);

  if (!horseData || horseData.length === 0 || !horseData[0] || horseData[0].length === 0 || !horseData[0][0] || horseData[0][0].length === 0) {
    if (timeoutMessage) {
      return <div className={styles.pageContainer}>
                <div className={styles.noDataContainer}>{timeoutMessage}</div>
              </div>;
    }
    return <Loading />;
  }


  return (
    <div className={styles.pageContainer}>
      <div className={styles.bodyContainer}>
        <div className={styles.nameContainer}>
          <p className={styles.horseName}>{horseData[0][0][0].name}</p>
          <p className={styles.horseAge}>({horseData[0][0][0].sex}, {age} Jahre)</p>
        </div>

        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList className={styles.tablistStyle}>
            <Tab className={styles.tab}>Top</Tab>
            <Tab className={styles.tab}>Formen</Tab>
            <Tab className={styles.tab}>Pedigree</Tab>
          </TabList>

          {/* TOPタブ */}
          <TabPanel>
            <div className={styles.mainContainer1}>
              <div className={styles.main1LeftContainer}>
                <div className={styles.photoSpace}>No Photo</div>
                <div className={styles.threadSpace}>Coming Soon...</div>
              </div>
              <div className={styles.main1RightContainer}>
                <div className={styles.infoTitle}>
                  <p className={styles.paddingBottom}><LooksOneIcon /></p>
                  <p className={styles.paddingLeftMini}>Profi</p>
                </div>
                <div className={styles.infoSpace}>
                  <div className={styles.infoLeft}>
                    <p className={styles.infoLeftRow}>Birth</p>
                    <p className={`${styles.infoLeftRow} ${styles.evenRow}`}>Trainer</p>
                    <p className={styles.infoLeftRow}>Besitzer</p>
                    <p className={`${styles.infoLeftRow} ${styles.evenRow}`}>Zuchter</p>
                    <p className={styles.infoLeftRow}>Family</p>
                    <p className={`${styles.infoLeftRow} ${styles.evenRow}`}>Preisgeld</p>
                  </div>
                  <div className={styles.infoRight}>
                    <p className={styles.infoRightRow}>{horseData[0][0][0].birth}</p>
                    <p className={`${styles.infoRightRow} ${styles.evenRow}`}>{horseData[0][0][0].trainer}</p>
                    <p className={styles.infoRightRow}>{horseData[0][0][0].owner}</p>
                    <p className={`${styles.infoRightRow} ${styles.evenRow}`}>{horseData[0][0][0].breeder}</p>
                    <p className={styles.infoRightRow}>{horseData[0][0][0].family}</p>
                    <p className={`${styles.infoRightRow} ${styles.evenRow}`}>{horseData[0][0][0].total_earnings} €</p>
                  </div>
                  
                </div>
                <div className={styles.pedigreeSpace}>
                  <div className={styles.pedigreeTitle}>
                    <p className={styles.paddingBottom}><LooksTwoIcon /></p>
                    <p className={styles.paddingLeftMini}>Pedigree</p>
                  </div>
                  <div className={styles.pedigreeBody}>
                    <div className={styles.pedigreeRowContainer}>
                      <p className={`${styles.pedigreeRow1} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_1}</p>
                      <p className={`${styles.pedigreeRow1} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_2}</p>
                    </div>
                    <div className={styles.pedigreeRowContainer}>
                      <p className={`${styles.pedigreeRow2} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_3}</p>
                      <p className={`${styles.pedigreeRow2} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_4}</p>
                      <p className={`${styles.pedigreeRow2} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_5}</p>
                      <p className={`${styles.pedigreeRow2} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_6}</p>
                    </div>
                  </div>
                  <div className={styles.showMore} onClick={selectPedigreeTab}>
                      <p>Mehr Anzeigen</p>
                      <p><PlayArrowIcon fontSize='small' /></p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.mainContainer2}>
              <div className={styles.resultsTableContainer}>
                <div className={styles.resultsTitle}>
                  <p className={styles.paddingBottom}><Looks3Icon /></p>
                  <span className={styles.paddingLeftMini}>Formen</span>
                </div>
                <div className={styles.resultsTableColumns}>
                    <p className={styles.dateColumn}>Date</p>
                    <p className={styles.ortColumn}>Ort</p>
                    <p className={styles.kategorieColumn}>Kategorie</p>
                    <p className={styles.evqColumn}>Evq.</p>
                    <p className={styles.platzColumn}>Pl.</p>
                    <p className={styles.distanzColumn}>Distanz</p>
                    <p className={styles.gewColumn}>Gew.</p>
                    <p className={styles.gagColumn}>GAG</p>
                </div>
                <div className={styles.resultsTableBody}>
                  {horseData[2][0].slice(0, 3).map((record, index) => { // 最初の3つのレコードのみマップする
                    const dateObj = new Date(record.date);
                    const dateString = dateObj.toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit'
                    });
                    // 偶数行の判定 (0-based indexで考慮するため、index + 1 を使う)
                    const rowStyle = (index % 2 === 0) ? '' : styles.evenRow;

                    return (
                      <Link key={index} href={`/results/${record.race_id}`} className={`${styles.tableRowContainer} ${rowStyle}`}>
                          <p className={styles.dateColumn}>{dateString}</p>
                          <p className={styles.ortColumn}>{record.ort}</p>
                          <p className={styles.kategorieColumn}>{record.kategorie}</p>
                          <p className={styles.evqColumn}>{record.evq}</p>
                          <p className={styles.platzColumn}>{record.platz}/{record.strs}</p>
                          <p className={styles.distanzColumn}>{record.distanz}m</p>
                          <p className={styles.gewColumn}>{record.gew}kg</p>
                          <p className={styles.gagColumn}>{record.gag}kg</p>
                      </Link>
                    );
                  })}
                  
                  {/* Mehr Anzeigen ボタンの表示条件 */}
                  {horseData[2][0].length > 3 && (
                    <div className={styles.showMore} onClick={selectFormenTab}>
                      <p>Mehr Anzeigen</p>
                      <p><PlayArrowIcon fontSize='small' /></p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Formenタブ */}
          <TabPanel>
            <div className={styles.formenTabBG}>
              <div className={styles.resultsTableContainer}>
                <div className={styles.resultsTitle}>
                  <p className={styles.paddingBottom}><Looks3Icon /></p>
                  <span className={styles.paddingLeftMini}>Formen</span>
                </div>
                <div className={styles.resultsTableColumns}>
                    <p className={styles.dateColumn}>Date</p>
                    <p className={styles.ortColumn}>Ort</p>
                    <p className={styles.kategorieColumn}>Kategorie</p>
                    <p className={styles.evqColumn}>Evq.</p>
                    <p className={styles.platzColumn}>Pl.</p>
                    <p className={styles.distanzColumn}>Distanz</p>
                    <p className={styles.gewColumn}>Gew.</p>
                    <p className={styles.gagColumn}>GAG</p>
                </div>
                <div className={styles.resultsTableBody}>
                  {horseData[2][0].map((record, index) => {
                    const dateObj = new Date(record.date);
                    const dateString = dateObj.toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit'
                    });
                    // 偶数行の判定
                    const rowStyle = (index % 2 === 0) ? '' : styles.evenRow;

                    return (
                      <Link key={index} href={`/results/${record.race_id}`} className={`${styles.tableRowContainer} ${rowStyle}`}>
                        <p className={styles.dateColumn}>{dateString}</p>
                        <p className={styles.ortColumn}>{record.ort}</p>
                        <p className={styles.kategorieColumn}>{record.kategorie}</p>
                        <p className={styles.evqColumn}>{record.evq}</p>
                        <p className={styles.platzColumn}>{record.platz} / {record.strs}</p>
                        <p className={styles.distanzColumn}>{record.distanz}m</p>
                        <p className={styles.gewColumn}>{record.gew}kg</p>
                        <p className={styles.gagColumn}>{record.gag}kg</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabPanel>
          {/* Pedigreeタブ */}
          <TabPanel>
            <div className={styles.tabPedigreeBG}>
              <div className={styles.pedigreeTabTitle}>
                <p className={styles.paddingBottom}><LooksTwoIcon /></p>
                <p className={styles.paddingLeftMini}>Pedigree</p>
              </div>
              <div className={styles.tabPedigreeContainer}>
                {/* 1代 */}
                <div className={styles.pedigreeContainerOne}>
                  {horseData[0][0][0].name}
                </div>
                {/* 2代 */}
                <div className={styles.pedigreeContainerDummy}>
                  <p className={`${styles.pedigreeContainerTwo} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_1}</p>
                  <p className={`${styles.pedigreeContainerTwo} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_2}</p>
                </div>
                {/* 3代 */}
                <div>
                  <p className={`${styles.pedigreeContainerThree} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_3}</p>
                  <p className={`${styles.pedigreeContainerThree} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_4}</p>
                  <p className={`${styles.pedigreeContainerThree} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_5}</p>
                  <p className={`${styles.pedigreeContainerThree} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_6}</p>
                </div>
                {/* 4代 */}
                <div>
                  <p className={`${styles.pedigreeContainerFour} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_7}</p>
                  <p className={`${styles.pedigreeContainerFour} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_8}</p>
                  <p className={`${styles.pedigreeContainerFour} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_9}</p>
                  <p className={`${styles.pedigreeContainerFour} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_10}</p>
                  <p className={`${styles.pedigreeContainerFour} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_11}</p>
                  <p className={`${styles.pedigreeContainerFour} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_12}</p>
                  <p className={`${styles.pedigreeContainerFour} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_13}</p>
                  <p className={`${styles.pedigreeContainerFour} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_14}</p>
                </div>
                {/* 5代 */}
                <div>
                  <p className={`${styles.pedigreeContainerFive} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_15}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_16}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_17}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_18}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_19}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_20}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_21}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_22}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_23}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_24}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_25}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_26}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_27}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_28}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.fatherColor}`}>{horseData[1][0][0].pedigree_29}</p>
                  <p className={`${styles.pedigreeContainerFive} ${styles.motherColor}`}>{horseData[1][0][0].pedigree_30}</p>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
