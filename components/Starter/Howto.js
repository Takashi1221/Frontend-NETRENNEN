import React, { useState } from 'react';
import styles from '/styles/Starter/Howto.module.css';

const translations = {
    DE: {
      header1: 'Pferdeinformationen verstehen',
      header2: 'Vergangene Ergebnisse verstehen',
      texts: [
        'Nummer und (Box)', 'Name', 'Jahre', 'Reiter', 'Trainer', 'Vater', 'Vater der Mutter',
        'Aktuelles Gewicht / GAG', 
        'Voraussichtliche Siegquote', 'Datum und Ort', 'Kategorie Rennen', 'Platz / Starter', 'Boden', 'Box',
        'Siegqutote', 'Distanz und Laufzeit des Rennens', 'Zeitdifferenz zum Sieger (oder 2. Platz)', 'Reiter',
        'Gew.', 'Position beim Passieren der Kurven'
      ],
      gagExplanation: 'Der GAG (Generalausgleichsgewicht) ist eine Bewertung, die aus den Ergebnissen vergangener Rennen berechnet und in Gewichtseinheiten ausgedrückt wird.'
    },
    EN: {
      header1: 'Understanding Horse Information',
      header2: 'Understanding Past Results',
      texts: [
        'Number and (Box)', 'Name', 'Years', 'Jockey', 'Trainer', 'Sire', 'Dam\'s Sire',
        'Weight / GAG ', 
        'Expected Odds', 'Date and Location', 'Race Category', 'Place / Starters', 'Ground', 'Box',
        'Odds', 'Distance and Race Time', 'Time Difference to Winner (or 2nd place)', 'Jockey',
        'Weight', 'Position when Passing Corners'
      ],
      gagExplanation: 'The GAG (General Adjustment Weight) is a rating calculated from past race results and expressed in weight units.'
    },
    FR: {
      header1: 'Comprendre les informations sur les chevaux',
      header2: 'Comprendre les résultats passés',
      texts: [
        'Numéro et (Box)', 'Nom', 'Âge', 'Jockey', 'Entraîneur', 'Père', 'Père de la mère',
        'Poids actuel / GAG', 
        'Cotes attendues', 'Date et lieu', 'Catégorie de la course', 'Place / Partants', 'Terrain', 'Box',
        'Cotes', 'Distance et temps de course', 'Différence de temps avec le vainqueur (ou 2ème place)', 'Jockey',
        'Poids', 'Position lors du passage des virages'
      ],
      gagExplanation: 'Le GAG (Poids d\'ajustement général) est une note calculée à partir des résultats des courses passées et exprimée en unités de poids.'
    },
    JP: {
      header1: '馬情報の見方',
      header2: '戦績情報の見方',
      texts: [
        '馬番と（ゲート番号）', '馬前', '馬齢', '騎手', '調教師', '父', '母父',
        '斤量 / GAG', 
        '推定オッズ', '日付と競馬場', 'クラス・条件', '着順 / 出走数', '馬場状態', 'ゲート番号',
        'オッズ', '距離と走破時計', '着タイム差', '騎手',
        '斤量', 'コーナー通過順'
      ],
      gagExplanation: 'GAG = 過去の戦績から計算されたレーティングを斤量で表現したもの。'
    }
  };

export function HowTo() {
    const [language, setLanguage] = useState('DE');

    const handleLanguageChange = (lang) => {
    setLanguage(lang);
    };

    const t = translations[language];

    return (
        <div className={styles.body}>
            <div className={styles.languageButtons}>
                <button onClick={() => handleLanguageChange('DE')}>DE</button>
                <button onClick={() => handleLanguageChange('EN')}>EN</button>
                <button onClick={() => handleLanguageChange('FR')}>FR</button>
                <button onClick={() => handleLanguageChange('JP')}>JP</button>
            </div>
            <div className={styles.howToContainer}>
                <div className={styles.howToHeader}>{t.header1}</div>
                <div className={styles.howToBody}>
                    <div className={styles.imgContainer1}></div>
                    <div className={styles.textContainer}>
                        <div className={styles.textLeft}>
                        {t.texts.slice(0, 5).map((text, index) => (
                            <div className={styles.textRow} key={index}>
                                <p className={styles.number}>{index + 1}</p>
                                <p className={styles.description}>{text}</p>
                            </div>
                        ))}
                        </div>
                        <div className={styles.textRight}>
                        {t.texts.slice(5, 9).map((text, index) => (
                            <div className={styles.textRow} key={index + 5}>
                                <p className={styles.number}>{index + 6}</p>
                                <p className={styles.description}>{text}</p>
                            </div>
                        ))}
                        <span className={styles.gag}>{t.gagExplanation}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.howToContainer}>
                <div className={styles.howToHeader}>{t.header2}</div>
                <div className={styles.howToBody}>
                    <div className={styles.imgContainer2}></div>
                    <div className={styles.textContainer}>
                        <div className={styles.textLeft}>
                        {t.texts.slice(9, 14).map((text, index) => (
                            <div className={styles.textRow} key={index + 10}>
                                <p className={styles.number}>{index + 1}</p>
                                <p className={styles.description}>{text}</p>
                            </div>
                        ))}
                        </div>
                        <div className={styles.textRight}>
                        {t.texts.slice(14).map((text, index) => (
                            <div className={styles.textRow} key={index + 15}>
                                <p className={styles.number}>{index + 6}</p>
                                <p className={styles.description}>{text}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.howToContainerMobil}>
                <div className={styles.howToHeader}>{t.header1}</div>
                <div className={styles.howToBody}>
                    <div className={styles.textContainerMobil1}>
                        <div className={styles.imgContainer1}></div>
                        <div className={styles.textLeft}>
                        {t.texts.slice(0, 5).map((text, index) => (
                            <div className={styles.textRow} key={index}>
                                <p className={styles.number}>{index + 1}</p>
                                <p className={styles.description}>{text}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className={styles.textContainerMobil2}>
                        <div className={styles.textRight}>
                        {t.texts.slice(5, 9).map((text, index) => (
                            <div className={styles.textRow} key={index + 5}>
                                <p className={styles.number}>{index + 6}</p>
                                <p className={styles.description}>{text}</p>
                            </div>
                        ))}
                        <span className={styles.gagMobil}>{t.gagExplanation}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.howToContainerMobil}>
                <div className={styles.howToHeader}>{t.header2}</div>
                <div className={styles.howToBody}>
                    <div className={styles.textContainerMobil1}>
                        <div className={styles.imgContainer2}></div>
                        <div className={styles.textLeft}>
                        {t.texts.slice(9, 14).map((text, index) => (
                            <div className={styles.textRow} key={index + 10}>
                            <p className={styles.number}>{index + 1}</p>
                            <p className={styles.description}>{text}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className={styles.textContainerMobil2}>
                        <div className={styles.textRight}>
                        {t.texts.slice(14).map((text, index) => (
                            <div className={styles.textRow} key={index + 15}>
                            <p className={styles.number}>{index + 6}</p>
                            <p className={styles.description}>{text}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}