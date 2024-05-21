import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from "../../../components/Header";
import { LoginModal } from "../../../components/Home/LoginModal";
import { Footer } from "../../../components/Footer";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styles from "/styles/Starter/Kalender.module.css";


function RennKalender() {
    const [kalender, setKalender] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('/api/kalender/');
                setKalender(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerText}>Kalender</div>
                </div>
                <div className={styles.headerBackground}></div>
                <div className={styles.bodyContainer}>
                    <div className={styles.contentHeader}>
                        <p><CalendarMonthIcon sx={{ 
                                    marginLeft: '1vw',
                                    marginRight: '0.5vw',
                                    paddingBottom: '0.2vw',
                                    fontSize: '2vw', 
                                    color: '#122315'
                                }} /></p>
                        <p>Wichtigste Renntermine</p>
                    </div>
                    <div className={styles.jahrText}>(Jahr: 2024)</div>
                    <div className={styles.tableContainer}>
                        <div className={styles.tableHeader}>
                            <p className={styles.columnWigth70}>Datum</p>
                            <p className={styles.columnWigth140}>Ort</p>
                            <p className={styles.columnWigth450}>Renntitel</p>
                            <p className={styles.columnWigth90}>Distanz</p>
                            <p className={styles.columnWigth100}>Kategorie</p>
                            <p className={styles.columnWigth70}>Stute</p>
                            <p className={styles.columnWigth90}>Preisgeld</p>
                        </div>
                        {kalender.map((item, index) => {
                            // 日付オブジェクトを作成
                            const dateObj = new Date(item.datum);
                            // 日付をドイツ式にフォーマット
                            let dateString = dateObj.toLocaleDateString('de-DE', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric' // 年も含める必要があれば追加
                            }).replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$1.$2.'); // フォーマットを 'dd.mm.' にする
                            // 偶数行の場合は `evenRow` クラスを適用
                            const rowClass = index % 2 === 0 ? `${styles.tableRow} ${styles.evenRow}` : styles.tableRow;
                            return (
                                <div className={rowClass} key={index}>
                                    <p className={styles.columnWigth70}>{dateString}</p>
                                    <p className={styles.columnWigth140}>{item.rennort}</p>
                                    <p className={styles.columnWigth450}>{item.renntitel}</p>
                                    <p className={styles.columnWigth90}>{item.distanz}</p>
                                    <p className={styles.columnWigth100}>{item.kategorie}</p>
                                    <p className={styles.columnWigth70}>{item.stute}</p>
                                    <p className={styles.columnWigth90}>{item.preisgeld}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
  }
  
  export default RennKalender;