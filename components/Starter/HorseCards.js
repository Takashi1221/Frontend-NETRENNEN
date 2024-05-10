import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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

    fetchAllHorseData();

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
      enhanceStartersWithPedigree();
  }, [starters]); 

  // データ来てるか確認用
  useEffect(() => {
    console.log(enhancedStarters);
  }, [enhancedStarters]);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.resultsHeader}>
          <div className={styles.resultsHeaderColumn1}>Nr.(Box)</div>
          <div className={styles.resultsHeaderColumn2}>Horse Info</div>
          <div className={styles.resultsHeaderColumn3}>Alt/Gew</div>
          <div className={styles.resultsHeaderColumn4}>lätzte</div>
          <div className={styles.resultsHeaderColumn4}>vorlätzte</div>
        </div>
      <div className={styles.mainContainer}>
        {/* スターターコンテナ（コンテナ1） */}
        <div className={styles.horseWrapper}>
          {enhancedStarters.map((horse) => (
            <div key={horse.id} className={styles.horseContainer}>
              <div className={styles.markBox}>
                <p>▲</p>
              </div>
              <div className={styles.numBox}>
                <p>{horse.number}</p>
                <p>({horse.box})</p>
              </div>
              <div className={styles.infoBoxOne}>
                <p className={styles.nameBox}>
                  <Link href={`/horse/${horse.horse_id}`} className ={`${styles.textOverFlow} ${styles.linkStyle}`}>
                    {horse.name}
                  </Link>
                </p>
                <p className={styles.jockyBox}>
                  <span className={styles.textOverFlow}>{horse.jocky}</span>
                  <span className={styles.textOverFlow}>{horse.trainer}</span>
                  <span className={styles.textOverFlow}>{horse.owner}</span>
                </p>
                <p className={styles.sireBox}>
                  <span className={styles.textOverFlow}>v. {horse.pedigree[0]?.pedigree_1}</span>
                  <span className={styles.textOverFlow}>mv. {horse.pedigree[0]?.pedigree_2}</span>
                </p>
              </div>
              <div className={styles.infoBoxTwo}>
                <p>H.{horse.alter}</p>
                <p>
                  {horse.gew.split('kg').map((part, index, array) =>
                    index < array.length - 1 ? (
                      <span key={index}>{part}kg<br /></span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  )}
                </p>
                <p>({horse.gag})</p>
                <p>&quot;Evq:--&quot;</p>
              </div>
            </div>
          ))}
        </div>
        {/* 前走コンテナ1 配列の[0] */}
        <div className={styles.resultWrapper}>
          {records.map((horseResults, index) => {
            const result = horseResults[0];
            if (!result) {
              return (
                <div className={styles.resultsContainerEmputy} key={index}></div>
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
              .replace(/Ausgleich/g, 'Agl.')
              .replace(/Listenrennen/g, 'List.')
              .replace(/Gruppe/g, 'Gr.')
              .replace(/Stutenrennen/g, 'Stut.')
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
              containerColor = styles.resultsContainer4;
            }

            let platzColor;
            if (result.platz === 1) {
              platzColor = styles.platzBox1;
            } else if (result.platz === 2) {
              platzColor = styles.platzBox2;
            } else if (result.platz === 3) {
              platzColor = styles.platzBox3;
            } else {
              platzColor = styles.platzBox4;
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
                        {result.title}
                      </Link>
                    </p>
                  </div>
                  <div className={styles.categorieBox}>
                    <p className={styles.textCotegorie} dangerouslySetInnerHTML={{ __html: kategorieTransformed }}></p>
                  </div>
                </div>
                <div className={styles.platzRow}>
                  <div className={styles.platzContainer}>
                    <p className={platzColor}>{result.platz}</p>
                  </div>
                  <div className={styles.platzRightContainer}>
                    <div className={styles.platzRightRow1}>
                      <span  className={styles.textLight} dangerouslySetInnerHTML={{ __html: bodenTransformed }}></span>
                    </div>
                    <div className={styles.platzRightRow2}>
                      <span className={styles.textSmallLight}>/{result.strs} ({result.box})</span>
                      <p className={styles.platzRightTextBox}>
                        <span className={styles.textLightEvq}>{result.evq}</span>
                        <span className={styles.textExtraSmall}>evq</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.resultsDetailContainerLower}>
                  <div className={styles.lowerRow1}>
                    <p className={styles.textSmallLight}>{result.distanz}m</p>
                    <p className={styles.textSmallLight}>{result.race_time}</p>
                  </div>
                  <div className={styles.lowerRow2}>
                    <p className={styles.textSmallLight}>{result.reiter}</p>
                    <p className={styles.textSmallLight}>
                      <span>{result.gew}</span>
                      <span className={styles.textExtraSmall}>kg</span>
                    </p>
                  </div>
                  <div className={styles.lowerRow3}>
                    <p className={styles.textSmallLight}>
                      {result.platz === 1 ? `(${result.abstand_zeit}) ${result.abstand}` : `(${result.abstand_zeit})`}
                    </p>
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
              return (
                <div className={styles.resultsContainerEmputy} key={index}></div>
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
                .replace(/Ausgleich/g, 'Agl.')
                .replace(/Listenrennen/g, 'List.')
                .replace(/Gruppe/g, 'Gr.')
                .replace(/Stutenrennen/g, 'Stut.')
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
              containerColor = styles.resultsContainer4;
            }

            let platzColor;
            if (result.platz === 1) {
              platzColor = styles.platzBox1;
            } else if (result.platz === 2) {
              platzColor = styles.platzBox2;
            } else if (result.platz === 3) {
              platzColor = styles.platzBox3;
            } else {
              platzColor = styles.platzBox4;
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
                        {result.title}
                      </Link>
                    </p>
                  </div>
                  <div className={styles.categorieBox}>
                    <p className={styles.textCotegorie} dangerouslySetInnerHTML={{ __html: kategorieTransformed }}></p>
                  </div>
                </div>
                <div className={styles.platzRow}>
                  <div className={styles.platzContainer}>
                    <p className={platzColor}>{result.platz}</p>
                  </div>
                  <div className={styles.platzRightContainer}>
                    <div className={styles.platzRightRow1}>
                      <span  className={styles.textLight} dangerouslySetInnerHTML={{ __html: bodenTransformed }}></span>
                    </div>
                    <div className={styles.platzRightRow2}>
                      <span className={styles.textSmallLight}>/{result.strs} ({result.box})</span>
                      <p className={styles.platzRightTextBox}>
                        <span className={styles.textLightEvq}>{result.evq}</span>
                        <span className={styles.textExtraSmall}>evq</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.resultsDetailContainerLower}>
                  <div className={styles.lowerRow1}>
                    <p className={styles.textSmallLight}>{result.distanz}m</p>
                    <p className={styles.textSmallLight}>{result.race_time}</p>
                  </div>
                  <div className={styles.lowerRow2}>
                    <p className={styles.textSmallLight}>{result.reiter}</p>
                    <p className={styles.textSmallLight}>
                      <span>{result.gew}</span>
                      <span className={styles.textExtraSmall}>kg</span>
                    </p>
                  </div>
                  <div className={styles.lowerRow3}>
                    <p className={styles.textSmallLight}>
                      {result.platz === 1 ? `(${result.abstand_zeit}) ${result.abstand}` : `(${result.abstand_zeit})`}
                    </p>
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