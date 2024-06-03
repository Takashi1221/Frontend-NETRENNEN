import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CheckBox from './CheckBox';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import styles from '/styles/Starter/HorseCards.module.css';

export function HorseCardsCopy({ starters }) {
  const [enhancedStarters, setEnhancedStarters] = useState([]);
  const [visibleResults, setVisibleResults] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [oddsData, setOddsData] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener('resize', checkMobile);
    checkMobile();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchAllHorseData = async () => {
      const updatedStarters = await Promise.all(starters.map(async (starter) => {
        const [pedigreeData, horseResults] = await Promise.all([
          fetch(`/api/pedigree/?horse_id=${starter.horse_id}`).then(res => res.json()),
          fetch(`/api/horseresults/?horse_id=${starter.horse_id}`).then(res => res.json())
        ]);
        return { ...starter, pedigree: pedigreeData, results: horseResults };
      }));

      setEnhancedStarters(updatedStarters);
      console.log(updatedStarters)
    };

    if (starters) {
      fetchAllHorseData();
    }
  }, [starters]);

  useEffect(() => {
    const fetchOddsData = async () => {
      if (starters && starters.length > 0) {
        const raceId = starters[0].race_id; // starters配列の最初のrace_idを使用
        const oddsData = await fetch(`/api/todayodds/?race_id=${raceId}`).then(res => res.json());
        setOddsData(oddsData);
      }
    };

    fetchOddsData();
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

  const toggleResultsVisibility = (horseId) => {
    setVisibleResults(prevState => ({
      ...prevState,
      [horseId]: !prevState[horseId],
    }));
  };

  const getOddsDataForHorse = (horseId) => {
    const odds = oddsData.find(odds => odds.horse_id === horseId);
    const oddsValue = odds ? odds.quote : '[....]';
    const oddsClass = oddsValue.length === 3 ? styles.oddsHoch : styles.odds;
    return { oddsValue, oddsClass };
  };

  const getHorseContainerClass = (horseId) => {
    const { oddsValue } = getOddsDataForHorse(horseId);
    return oddsValue === 'NS' ? styles.horseContainerNs : styles.horseContainer;
  };

  if (!starters) {
    return (
      <div>....</div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      {isMobile ? (
        <div className={styles.mobilMainContainer}>
          {enhancedStarters.map((horse, index) => (
            <div className={styles.horseWrapper} key={horse.id}>
              <div className={getHorseContainerClass(horse.horse_id)}>
                <div className={styles.markBox}>
                  <p className={styles.number}>{horse.number}</p>
                  <p className={styles.number}>({horse.box})</p>
                  <CheckBox horseId={horse.horse_id} />
                </div>
                <div className={styles.infoBoxOne}>
                  <p className={styles.nameBox}>
                    <Link href={`/horse/${horse.horse_id}`} className={`${styles.textOverFlow} ${styles.linkStyle}`}>
                      {horse.name}
                    </Link>
                  </p>
                  <p className={styles.alt}>({horse.alter} Jahre)</p>
                  <p className={styles.jockyBox}>
                    <span className={`${styles.jockey} ${styles.textOverFlow}`}>{horse.jocky}</span>
                    <span className={`${styles.jockey} ${styles.textOverFlow}`}>{horse.trainer}</span>
                  </p>
                </div>
                <div className={styles.infoBoxTwo}>
                  <p className={styles.sireBox}>
                    <span className={styles.textOverFlow}>{horse.pedigree[0]?.pedigree_1}</span>
                    <span className={styles.textOverFlow}>{horse.pedigree[0]?.pedigree_2}</span>
                  </p>
                  <p className={styles.gewGag}>
                    <span>{truncateGew(horse.gew)} / {horse.gag}</span>
                  </p>
                  <p className={styles.oddsAndButton}>
                  <span className={getOddsDataForHorse(horse.horse_id).oddsClass}>{getOddsDataForHorse(horse.horse_id).oddsValue}</span>
                    <button 
                      className={styles.showSwiper}
                      onClick={() => toggleResultsVisibility(horse.id)}
                      >
                        {visibleResults[horse.id] ? <CloseIcon /> : <KeyboardArrowDownIcon />}
                    </button>
                    </p>
                </div>
              </div>
              {/* 馬柱コンテナ */}
              {visibleResults[horse.id] && (
                <div className={styles.resultWrapper}>
                  <Swiper
                    freeMode={true}
                    grabCursor={true}
                    scrollbar={{ draggable: true }}
                    modules={[FreeMode, Scrollbar]}
                    slidesPerView={horse.results.length > 1 ? 2 : 1}
                    spaceBetween={5}
                  >
                    {horse.results.length === 0 ? (
                      <SwiperSlide key={`empty-${horse.id}`}>
                        <div className={styles.resultsContainerEmpty}>Es ist das Debütrennen</div>
                      </SwiperSlide>
                    ) : (
                      horse.results.map((result, index) => {
                        const dateObj = new Date(result.date);
                        let dateString = dateObj
                          .toLocaleDateString('de-DE', {
                            day: '2-digit',
                            month: '2-digit',
                          })
                          .replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1.$2.');

                        let bodenTransformed = result.boden
                          ? result.boden.replace(/stellenweise/g, '*').replace(/bis/g, '-')
                          : '';

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

                        // ジョッキーの表示処理
                        let displayedReiter = result.reiter || '';
                        if (result.reiter) {
                          if (result.reiter.includes(' ')) {
                            const parts = result.reiter.split(' ');
                            displayedReiter = parts[parts.length - 1];
                            if (parts[0].startsWith('Am.')) {
                              displayedReiter = `Am.${displayedReiter}`;
                            }
                          }
                        }

                        // ドットをカンマに置換する処理
                        const evqTransformed = typeof result.evq === 'string' ? result.evq.replace(/\./g, ',') : (typeof result.evq === 'number' ? result.evq.toString().replace(/\./g, ',') : result.evq);
                        const abstandZeitTransformed = typeof result.abstand_zeit === 'string' ? result.abstand_zeit.replace(/\./g, ',') : (typeof result.abstand_zeit === 'number' ? result.abstand_zeit.toString().replace(/\./g, ',') : result.abstand_zeit);
                        const gewTransformed = typeof result.gew === 'string' ? result.gew.replace(/\./g, ',') : (typeof result.gew === 'number' ? result.gew.toString().replace(/\./g, ',') : result.gew);
                        

                        return (
                          <SwiperSlide key={result.race_horse_id}>
                            <div className={containerColor}>
                              <div className={styles.resultsDetailContainerUpper}>
                                <div className={styles.dayTitleBox}>
                                  <p className={styles.textDayOrt}>
                                    <span className={styles.marginRight}>{dateString}</span>
                                    <span className={styles.textOverFlow}>{result.ort}</span>
                                  </p>
                                  <p className={styles.titleRow}>
                                    <Link href={`/results/${result.race_id}`} className={`${styles.textOverFlow} ${styles.linkStyle}`}>
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
                                    <span className={styles.startbox}>[{result.box}]</span>
                                    <p className={styles.platzRightTextBox}>
                                      <span>{evqTransformed}</span>
                                      <span className={styles.textExtraSmall}>evq</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.resultsDetailContainerLower}>
                                <div className={styles.lowerRow1}>
                                  <p className={styles.distanz}>{result.distanz}m</p>
                                  <p className={styles.raceTime}>{result.race_time}</p>
                                  <p className={styles.abstandZeit}>({abstandZeitTransformed})</p>
                                </div>
                                <div className={styles.lowerRow2}>
                                  <p className={styles.distanz}>{displayedReiter}</p>
                                  <p className={styles.abstandZeit}>
                                    <span>{gewTransformed}</span>
                                    <span>kg</span>
                                  </p>
                                </div>
                                <div className={styles.lowerRow3}>
                                  <p className={styles.passingOrder}>{result.passing_order ? result.passing_order : '----'}</p>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })
                    )}
                  </Swiper>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.mainContainer}>
          {enhancedStarters.map((horse, index) => (
            <div className={styles.horseWrapper} key={horse.id}>
              <div className={getHorseContainerClass(horse.horse_id)}>
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
                    <Link href={`/horse/${horse.horse_id}`} className={`${styles.textOverFlow} ${styles.linkStyle}`}>
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
                  <p className={styles.oddsBox}>
                    <span className={getOddsDataForHorse(horse.horse_id).oddsClass}>{getOddsDataForHorse(horse.horse_id).oddsValue}</span>
                  </p>
                  
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
              {/* 馬柱コンテナ */}
              <div className={styles.resultWrapper}>
                {horse.results.length === 0 ? (
                  <div className={styles.resultsContainerEmpty} key={`empty-${horse.id}`}>Es ist das Debütrennen</div>
                ) : (
                  horse.results.map((result, index) => {
                    const dateObj = new Date(result.date);
                    let dateString = dateObj
                      .toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                      })
                      .replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1.$2.');

                    let bodenTransformed = result.boden
                      ? result.boden.replace(/stellenweise/g, '*').replace(/bis/g, '-')
                      : '';

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
                      <div key={result.race_horse_id} className={containerColor}>
                        <div className={styles.resultsDetailContainerUpper}>
                          <div className={styles.dayTitleBox}>
                            <p className={styles.textDayOrt}>
                              <span className={styles.marginRight}>{dateString}</span>
                              <span className={styles.textOverFlow}>{result.ort}</span>
                            </p>
                            <p className={styles.titleRow}>
                              <Link href={`/results/${result.race_id}`} className={`${styles.textOverFlow} ${styles.linkStyle}`}>
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
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}