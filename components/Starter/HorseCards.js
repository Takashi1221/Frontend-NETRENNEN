import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CheckBox from './CheckBox';
import styles from '/styles/Starter/HorseCards.module.css';

export function HorseCards({ starters }) {

  const [enhancedStarters, setEnhancedStarters] = useState([]);
  const [records, setRecords] = useState([]);

  // 戦績を取得
  useEffect(() => {
    const fetchHorseData = async (horseId) => {
      const response = await fetch(`/api/horseresults/?horse_id=${horseId}`);
      const data = await response.json();
      return data;
    };

    const fetchAllHorseData = async () => {
      const promises = starters.map((horse) => fetchHorseData(horse.horse_id));
      const results = await Promise.all(promises);
      setRecords(results);
    };

    if (starters) {
      fetchAllHorseData();
    }

  }, [starters]);

  // 血統を取得
  useEffect(() => {
    const fetchPedigreeData = async (horseId) => {
      const response = await fetch(`/api/pedigree/?horse_id=${horseId}`);
      const pedigreeData = await response.json();
      return pedigreeData;
    };

    const enhanceStartersWithPedigree = async () => {
      const updatedStarters = await Promise.all(starters.map(async (starter) => {
        const pedigreeData = await fetchPedigreeData(starter.horse_id);
        return { ...starter, pedigree: pedigreeData };
      }));

      setEnhancedStarters(updatedStarters);
    };
    
    if (starters) {
      enhanceStartersWithPedigree();
    }

  }, [starters]); 


  const truncateGew = (gew) => {
    const patterns = ['Erl.', 'Mgw.'];
    let truncatedGew = gew;

    patterns.forEach(pattern => {
      const index = truncatedGew.indexOf(pattern);
      if (index !== -1) {
        truncatedGew = truncatedGew.substring(0, index);
      }
    });

    return truncatedGew.trim();
  };

  if (!starters) {
    return (
      <div>....</div>
    );
  }

 

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.mainContainer}>
        {/* スターターコンテナ（コンテナ1） */}
        <div className={styles.horseWrapper}>
          {enhancedStarters.map((horse, index) => (
            <div 
            key={horse.id} 
            className={`${styles.horseContainer} ${index % 2 === 0 ? styles.horseContainerEven : styles.horseContainerOdd}`}
            >
              <div className={styles.markBox}>
                <CheckBox horseId={horse.horse_id} />
              </div>
              <div className={styles.numBox}>
                <p>{horse.number}</p>
                <p>({horse.box})</p>
              </div>
              <div className={styles.infoBoxOne}>
                <p className={styles.sireBox}>
                  <span className={styles.textOverFlow}>{horse.pedigree[0]?.pedigree_1}</span>
                </p>
                <p className={styles.nameBox}>
                  <Link href={`/horse/${horse.horse_id}`} className ={`${styles.textOverFlow} ${styles.linkStyle}`}>
                    {horse.name}
                  </Link>
                </p>
                <p className={styles.sireBox}>
                  <span className={styles.textOverFlow}>{horse.pedigree[0]?.pedigree_2}</span>
                </p>
                <p className={styles.jockyBox}>
                  <span className={styles.textOverFlow}>{horse.jocky}</span>
                  <span className={styles.textOverFlow}>{horse.trainer}</span>
                  <span className={styles.textOverFlow}>{horse.owner}</span>
                </p>
                <p className={styles.oddsBox}>[....]</p>
              </div>
              <div className={styles.infoBoxTwo}>
                <p className={styles.alterGew}>
                  <span>{horse.alter} Jahre</span>
                  <span>{truncateGew(horse.gew)}</span>
                </p>
                <p className={styles.gaw}>
                  <span>GAG:</span>
                  <span>{horse.gag}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* 前走コンテナ1 配列の[0] */}
        <div className={styles.resultWrapper}>
          {records.map((horseResults, index) => {
            const result = horseResults[0];
            if (!result) {
              const emptyContainerClass = index % 2 === 0 
              ? styles.resultsContainerEmptyEven 
              : styles.resultsContainerEmptyOdd;

              return (
                <div className={emptyContainerClass} key={index}></div>
              );
            }
            const dateObj = new Date(result.date);
            let dateString = dateObj.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
            }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1.$2.');
            // bodenの値に変換を適用して、ブラウザに表示
            let bodenTransformed = result.boden
              ? result.boden
                .replace(/stellenweise/g, '*')
                .replace(/bis/g, '-')
              : '';
            // kategorieの値に変換を適用して、ブラウザに表示
            let kategorieTransformed = result.kategorie
              ? result.kategorie
              .replace(/Listenrennen/g, 'Listen.')
              .replace(/Stutenrennen/g, 'Stuten.')
              .replace(/Verkaufsrennen/g, '')
              .replace(/EBF-Rennen/g, '')
              .replace(/Amateurrennen/g, '')
              .replace(/Amazonenreiten/g, '')
              .replace(/-/g, '')
              : '';
            // result.platzの値に基づいて適用するCSSクラスを決定
            let containerColor;
            if (result.platz === 1) {
              containerColor = styles.resultsContainer1;
            } else if (result.platz === 2) {
              containerColor = styles.resultsContainer2;
            } else if (result.platz === 3) {
              containerColor = styles.resultsContainer3;
            } else {
              containerColor = index % 2 === 0 ? styles.resultsContainer4Even : styles.resultsContainer4Odd;
            }

            let platzColor;
            if (result.platz === 1) {
              platzColor = styles.platzBox1;
            } else if (result.platz === 2) {
              platzColor = styles.platzBox2;
            } else if (result.platz === 3) {
              platzColor = styles.platzBox3;
            } else {
              platzColor = index % 2 === 0 ? styles.platzBox4Even : styles.platzBox4Odd;
            }

            return (
              <div  key={result.race_horse_id} className={containerColor}>
                <div className={styles.resultsDetailContainerUpper}>
                  <div className={styles.dayTitleBox}>
                    <p className={styles.textDayOrt}>
                      <span className={styles.marginRight}>{dateString}</span>
                      <span className={styles.textOverFlow}>{result.ort}</span>
                    </p>
                    <p className={styles.titleRow}>
                      <Link href={`/results/${result.race_id}`} className ={`${styles.textOverFlow} ${styles.linkStyle}`}>
                      <p dangerouslySetInnerHTML={{ __html: kategorieTransformed }}></p>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className={styles.platzRow}>
                  <div className={styles.platzContainer}>
                    <p className={platzColor}>{result.platz}</p>
                  </div>
                  <div className={styles.platzRightContainer}>
                    <div className={styles.platzRightRow1}>
                      <span dangerouslySetInnerHTML={{ __html: bodenTransformed }}></span>
                    </div>
                    <div className={styles.platzRightRow2}>
                      <span className={styles.strs}>/{result.strs}</span>
                      <span className={styles.textLightEvq}>[{result.box}]</span>
                      <p className={styles.platzRightTextBox}>
                        <span className={styles.textLightEvq}>{result.evq}</span>
                        <span className={styles.textExtraSmall}>evq</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.resultsDetailContainerLower}>
                  <div className={styles.lowerRow1}>
                    <p className={styles.distanz}>{result.distanz}m</p>
                    <p className={styles.raceTime}>{result.race_time}</p>
                    <p className={styles.textLightEvq}>({result.abstand_zeit})</p>
                  </div>
                  <div className={styles.lowerRow2}>
                    <p className={styles.distanz}>{result.reiter}</p>
                    <p className={styles.textSmallLight}>
                      <span>{result.gew}</span>
                      <span>kg</span>
                    </p>
                  </div>
                  <div className={styles.lowerRow3}>
                    <p className={styles.passingOrder}>{result.passing_order ? result.passing_order : '----'}</p>
                    <p className={styles.commentText}>{result.comment ? result.comment : '----'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* 前走コンテナ2 配列の[1] */}
        <div className={styles.resultWrapper}>
          {records.map((horseResults, index) => {
            const result = horseResults[1];
            if (!result) {
              const emptyContainerClass = index % 2 === 0 
              ? styles.resultsContainerEmptyEven 
              : styles.resultsContainerEmptyOdd;

              return (
                <div className={emptyContainerClass} key={index}></div>
              );
            }
            const dateObj = new Date(result.date);
            let dateString = dateObj.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
            }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1.$2.');
            // bodenの値に変換を適用して、ブラウザに表示
            let bodenTransformed = result.boden
              ? result.boden
                .replace(/stellenweise/g, '*')
                .replace(/bis/g, '-')
              : '';
            // kategorieの値に変換を適用して、ブラウザに表示
            let kategorieTransformed = result.kategorie
              ? result.kategorie
                .replace(/Listenrennen/g, 'Listen.')
                .replace(/Gruppe/g, 'G')
                .replace(/Stutenrennen/g, 'Stuten.')
                .replace(/Verkaufsrennen/g, '')
                .replace(/EBF-Rennen/g, '')
                .replace(/Amateurrennen/g, '')
                .replace(/Amazonenreiten/g, '')
                .replace(/-/g, '')
              : '';
            // result.platzの値に基づいて適用するCSSクラスを決定
            let containerColor;
            if (result.platz === 1) {
              containerColor = styles.resultsContainer1;
            } else if (result.platz === 2) {
              containerColor = styles.resultsContainer2;
            } else if (result.platz === 3) {
              containerColor = styles.resultsContainer3;
            } else {
              containerColor = index % 2 === 0 ? styles.resultsContainer4Even : styles.resultsContainer4Odd;
            }

            let platzColor;
            if (result.platz === 1) {
              platzColor = styles.platzBox1;
            } else if (result.platz === 2) {
              platzColor = styles.platzBox2;
            } else if (result.platz === 3) {
              platzColor = styles.platzBox3;
            } else {
              platzColor = index % 2 === 0 ? styles.platzBox4Even : styles.platzBox4Odd;
            }

            return (
              <div  key={result.race_horse_id} className={containerColor}>
                <div className={styles.resultsDetailContainerUpper}>
                  <div className={styles.dayTitleBox}>
                    <p className={styles.textDayOrt}>
                      <span className={styles.marginRight}>{dateString}</span>
                      <span className={styles.textOverFlow}>{result.ort}</span>
                    </p>
                    <p className={styles.titleRow}>
                      <Link href={`/results/${result.race_id}`} className ={`${styles.textOverFlow} ${styles.linkStyle}`}>
                      <p dangerouslySetInnerHTML={{ __html: kategorieTransformed }}></p>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className={styles.platzRow}>
                  <div className={styles.platzContainer}>
                    <p className={platzColor}>{result.platz}</p>
                  </div>
                  <div className={styles.platzRightContainer}>
                    <div className={styles.platzRightRow1}>
                      <span dangerouslySetInnerHTML={{ __html: bodenTransformed }}></span>
                    </div>
                    <div className={styles.platzRightRow2}>
                      <span className={styles.strs}>/{result.strs}</span>
                      <span className={styles.textLightEvq}>[{result.box}]</span>
                      <p className={styles.platzRightTextBox}>
                        <span className={styles.textLightEvq}>{result.evq}</span>
                        <span className={styles.textExtraSmall}>evq</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.resultsDetailContainerLower}>
                  <div className={styles.lowerRow1}>
                    <p className={styles.distanz}>{result.distanz}m</p>
                    <p className={styles.raceTime}>{result.race_time}</p>
                    <p className={styles.textLightEvq}>({result.abstand_zeit})</p>
                  </div>
                  <div className={styles.lowerRow2}>
                    <p className={styles.distanz}>{result.reiter}</p>
                    <p className={styles.textSmallLight}>
                      <span>{result.gew}</span>
                      <span>kg</span>
                    </p>
                  </div>
                  <div className={styles.lowerRow3}>
                    <p className={styles.passingOrder}>{result.passing_order ? result.passing_order : '----'}</p>
                    <p className={styles.commentText}>{result.comment ? result.comment : '----'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* 前走コンテナ3 配列の[2] */}
        <div className={styles.resultWrapper}>
          {records.map((horseResults, index) => {
            const result = horseResults[2];
            if (!result) {
              const emptyContainerClass = index % 2 === 0 
              ? styles.resultsContainerEmptyEven 
              : styles.resultsContainerEmptyOdd;

              return (
                <div className={emptyContainerClass} key={index}></div>
              );
            }
            const dateObj = new Date(result.date);
            let dateString = dateObj.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
            }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1.$2.');
            // bodenの値に変換を適用して、ブラウザに表示
            let bodenTransformed = result.boden
              ? result.boden
                .replace(/stellenweise/g, '*')
                .replace(/bis/g, '-')
              : '';
            // kategorieの値に変換を適用して、ブラウザに表示
            let kategorieTransformed = result.kategorie
              ? result.kategorie
                .replace(/Listenrennen/g, 'Listen.')
                .replace(/Gruppe/g, 'G')
                .replace(/Stutenrennen/g, 'Stuten.')
                .replace(/Verkaufsrennen/g, '')
                .replace(/EBF-Rennen/g, '')
                .replace(/Amateurrennen/g, '')
                .replace(/Amazonenreiten/g, '')
                .replace(/-/g, '')
              : '';
            // result.platzの値に基づいて適用するCSSクラスを決定
            let containerColor;
            if (result.platz === 1) {
              containerColor = styles.resultsContainer1;
            } else if (result.platz === 2) {
              containerColor = styles.resultsContainer2;
            } else if (result.platz === 3) {
              containerColor = styles.resultsContainer3;
            } else {
              containerColor = index % 2 === 0 ? styles.resultsContainer4Even : styles.resultsContainer4Odd;
            }

            let platzColor;
            if (result.platz === 1) {
              platzColor = styles.platzBox1;
            } else if (result.platz === 2) {
              platzColor = styles.platzBox2;
            } else if (result.platz === 3) {
              platzColor = styles.platzBox3;
            } else {
              platzColor = index % 2 === 0 ? styles.platzBox4Even : styles.platzBox4Odd;
            }

            return (
              <div  key={result.race_horse_id} className={containerColor}>
                <div className={styles.resultsDetailContainerUpper}>
                  <div className={styles.dayTitleBox}>
                    <p className={styles.textDayOrt}>
                      <span className={styles.marginRight}>{dateString}</span>
                      <span className={styles.textOverFlow}>{result.ort}</span>
                    </p>
                    <p className={styles.titleRow}>
                      <Link href={`/results/${result.race_id}`} className ={`${styles.textOverFlow} ${styles.linkStyle}`}>
                      <p dangerouslySetInnerHTML={{ __html: kategorieTransformed }}></p>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className={styles.platzRow}>
                  <div className={styles.platzContainer}>
                    <p className={platzColor}>{result.platz}</p>
                  </div>
                  <div className={styles.platzRightContainer}>
                    <div className={styles.platzRightRow1}>
                      <span dangerouslySetInnerHTML={{ __html: bodenTransformed }}></span>
                    </div>
                    <div className={styles.platzRightRow2}>
                      <span className={styles.strs}>/{result.strs}</span>
                      <span className={styles.textLightEvq}>[{result.box}]</span>
                      <p className={styles.platzRightTextBox}>
                        <span className={styles.textLightEvq}>{result.evq}</span>
                        <span className={styles.textExtraSmall}>evq</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.resultsDetailContainerLower}>
                  <div className={styles.lowerRow1}>
                    <p className={styles.distanz}>{result.distanz}m</p>
                    <p className={styles.raceTime}>{result.race_time}</p>
                    <p className={styles.textLightEvq}>({result.abstand_zeit})</p>
                  </div>
                  <div className={styles.lowerRow2}>
                    <p className={styles.distanz}>{result.reiter}</p>
                    <p className={styles.textSmallLight}>
                      <span>{result.gew}</span>
                      <span>kg</span>
                    </p>
                  </div>
                  <div className={styles.lowerRow3}>
                    <p className={styles.passingOrder}>{result.passing_order ? result.passing_order : '----'}</p>
                    <p className={styles.commentText}>{result.comment ? result.comment : '----'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* 前走コンテナ4 配列の[3] */}
        <div className={styles.resultWrapper}>
          {records.map((horseResults, index) => {
            const result = horseResults[3];
            if (!result) {
              const emptyContainerClass = index % 2 === 0 
              ? styles.resultsContainerEmptyEven 
              : styles.resultsContainerEmptyOdd;

              return (
                <div className={emptyContainerClass} key={index}></div>
              );
            }
            const dateObj = new Date(result.date);
            let dateString = dateObj.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
            }).replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1.$2.');
            // bodenの値に変換を適用して、ブラウザに表示
            let bodenTransformed = result.boden
              ? result.boden
                .replace(/stellenweise/g, '*')
                .replace(/bis/g, '-')
              : '';
            // kategorieの値に変換を適用して、ブラウザに表示
            let kategorieTransformed = result.kategorie
              ? result.kategorie
                .replace(/Listenrennen/g, 'Listen.')
                .replace(/Gruppe/g, 'G')
                .replace(/Stutenrennen/g, 'Stuten.')
                .replace(/Verkaufsrennen/g, '')
                .replace(/EBF-Rennen/g, '')
                .replace(/Amateurrennen/g, '')
                .replace(/Amazonenreiten/g, '')
                .replace(/-/g, '')
              : '';
            // result.platzの値に基づいて適用するCSSクラスを決定
            let containerColor;
            if (result.platz === 1) {
              containerColor = styles.resultsContainer1;
            } else if (result.platz === 2) {
              containerColor = styles.resultsContainer2;
            } else if (result.platz === 3) {
              containerColor = styles.resultsContainer3;
            } else {
              containerColor = index % 2 === 0 ? styles.resultsContainer4Even : styles.resultsContainer4Odd;
            }

            let platzColor;
            if (result.platz === 1) {
              platzColor = styles.platzBox1;
            } else if (result.platz === 2) {
              platzColor = styles.platzBox2;
            } else if (result.platz === 3) {
              platzColor = styles.platzBox3;
            } else {
              platzColor = index % 2 === 0 ? styles.platzBox4Even : styles.platzBox4Odd;
            }

            return (
              <div  key={result.race_horse_id} className={containerColor}>
                <div className={styles.resultsDetailContainerUpper}>
                  <div className={styles.dayTitleBox}>
                    <p className={styles.textDayOrt}>
                      <span className={styles.marginRight}>{dateString}</span>
                      <span className={styles.textOverFlow}>{result.ort}</span>
                    </p>
                    <p className={styles.titleRow}>
                      <Link href={`/results/${result.race_id}`} className ={`${styles.textOverFlow} ${styles.linkStyle}`}>
                      <p dangerouslySetInnerHTML={{ __html: kategorieTransformed }}></p>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className={styles.platzRow}>
                  <div className={styles.platzContainer}>
                    <p className={platzColor}>{result.platz}</p>
                  </div>
                  <div className={styles.platzRightContainer}>
                    <div className={styles.platzRightRow1}>
                      <span dangerouslySetInnerHTML={{ __html: bodenTransformed }}></span>
                    </div>
                    <div className={styles.platzRightRow2}>
                      <span className={styles.strs}>/{result.strs}</span>
                      <span className={styles.textLightEvq}>[{result.box}]</span>
                      <p className={styles.platzRightTextBox}>
                        <span className={styles.textLightEvq}>{result.evq}</span>
                        <span className={styles.textExtraSmall}>evq</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.resultsDetailContainerLower}>
                  <div className={styles.lowerRow1}>
                    <p className={styles.distanz}>{result.distanz}m</p>
                    <p className={styles.raceTime}>{result.race_time}</p>
                    <p className={styles.textLightEvq}>({result.abstand_zeit})</p>
                  </div>
                  <div className={styles.lowerRow2}>
                    <p className={styles.distanz}>{result.reiter}</p>
                    <p className={styles.textSmallLight}>
                      <span>{result.gew}</span>
                      <span>kg</span>
                    </p>
                  </div>
                  <div className={styles.lowerRow3}>
                    <p className={styles.passingOrder}>{result.passing_order ? result.passing_order : '----'}</p>
                    <p className={styles.commentText}>{result.comment ? result.comment : '----'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}