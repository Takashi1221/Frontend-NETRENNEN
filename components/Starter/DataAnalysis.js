import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from '/styles/Starter/DataAnalysis.module.css';


export function DataAnalysis({ thisRace, starters }) {
  const { location, distance } = thisRace;
  const [data, setData] = useState(null);
  const [enhancedStarters, setEnhancedStarters] = useState([]);
  const [probabilities, setProbabilities] = useState(null);
  const [boxProbabilities, setBoxProbabilities] = useState(null);
  const [topSires, setTopSires] = useState(null);
  const [topReiters, setTopReiters] = useState(null);
  const [topTrainers, setTopTrainers] = useState(null);
  const [topOwners, setTopOwners] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get(`/api/dataanalysis/?distanz=${distance}&ort=${location}`);
        setData(response.data);
        const topReiters = calculateReiterProbabilities(response.data, starters);
        setTopReiters(topReiters);
        const topTrainers = calculateTrainerProbabilities(response.data, starters);
        setTopTrainers(topTrainers);
        const topOwners = calculateOwnerProbabilities(response.data, starters);
        setTopOwners(topOwners);
        const calculatedProbabilities = calculateProbabilities(response.data);
        setProbabilities(calculatedProbabilities);
        const boxProbs = calculateBoxProbabilities(response.data);
        setBoxProbabilities(boxProbs);

      } catch (error) {
        console.error("Error fetching datas:", error);
        setError(error)
      }
    };

    if (distance && location) {
      fetchDatas();
    }
  }, [distance, location]);

  useEffect(() => {
    const pedigreeHorseData = async () => {
      const updatedStarters = await Promise.all(starters.map(async (starter) => {
        try {
          const response = await axios.get(`/api/pedigree/?horse_id=${starter.horse_id}`);
          return { ...starter, pedigree: response.data };
        } catch (error) {
          console.error(`Error fetching data for horse_id: ${starter.horse_id}`, error);
          return starter;
        }
      }));

      setEnhancedStarters(updatedStarters);
      console.log(updatedStarters)
      const topSires = calculateSireProbabilities(data, updatedStarters);
      setTopSires(topSires);
    };

    if (data) {
      pedigreeHorseData();
    }
  }, [data]);


  const calculateSireProbabilities = (data, updatedStarters) => {
    const sireStats = {};
    const damsireStats = {};
  
    const validSires = new Set(updatedStarters.map(starter => starter.pedigree[0].pedigree_1));
    const validDamsires = new Set(updatedStarters.map(starter => starter.pedigree[0].pedigree_5));
  
    data.forEach(item => {
      if (item.sire !== 'nan' && validSires.has(item.sire)) {
        const sire = item.sire;
        if (!sireStats[sire]) {
          sireStats[sire] = { total: 0, platz1: 0 };
        }
        sireStats[sire].total++;
        if (item.platz === '1') {
          sireStats[sire].platz1++;
        }
      }
  
      if (item.damsire !== 'nan' && validDamsires.has(item.damsire)) {
        const damsire = item.damsire;
        if (!damsireStats[damsire]) {
          damsireStats[damsire] = { total: 0, platz1: 0 };
        }
        damsireStats[damsire].total++;
        if (item.platz === '1') {
          damsireStats[damsire].platz1++;
        }
      }
    });
  
    const sireProbs = Object.entries(sireStats).map(([sire, stats]) => ({
      sire,
      p1: stats.platz1 / stats.total,
    }));
  
    const damsireProbs = Object.entries(damsireStats).map(([damsire, stats]) => ({
      damsire,
      p1: stats.platz1 / stats.total,
    }));
  
    const sortedSireByP1 = sireProbs.sort((a, b) => b.p1 - a.p1).slice(0, 5);
    const sortedDamsireByP1 = damsireProbs.sort((a, b) => b.p1 - a.p1).slice(0, 5);
  
    return { sortedSireByP1, sortedDamsireByP1 };
  };

  const calculateReiterProbabilities = (data, starters) => {
    const reiterStats = {};
    const startersSet = new Set(starters.map(starter => starter.jocky));

    data.forEach(item => {
      if (startersSet.has(item.reiter)) {
        const reiter = item.reiter;
        if (!reiterStats[reiter]) {
          reiterStats[reiter] = { total: 0, platz1: 0, platz123: 0 };
        }
        reiterStats[reiter].total++;
        if (item.platz === '1') {
          reiterStats[reiter].platz1++;
        }
        if (['1', '2', '3'].includes(item.platz)) {
          reiterStats[reiter].platz123++;
        }
      }
    });

    const reiterProbs = Object.entries(reiterStats).map(([reiter, stats]) => ({
      reiter,
      p1: stats.platz1 / stats.total,
      p123: stats.platz123 / stats.total,
    }));

    const sortedByP1 = reiterProbs.sort((a, b) => b.p1 - a.p1).slice(0, 5);
    const sortedByP123 = reiterProbs.sort((a, b) => b.p123 - a.p123).slice(0, 5);

    return { sortedByP1, sortedByP123 };
  };

  const calculateTrainerProbabilities = (data, starters) => {
    const trainerStats = {};
    const startersSet = new Set(starters.map(starter => starter.trainer));

    data.forEach(item => {
      if (startersSet.has(item.trainer)) {
        const trainer = item.trainer;
        if (!trainerStats[trainer]) {
          trainerStats[trainer] = { total: 0, platz1: 0, platz123: 0 };
        }
        trainerStats[trainer].total++;
        if (item.platz === '1') {
          trainerStats[trainer].platz1++;
        }
        if (['1', '2', '3'].includes(item.platz)) {
          trainerStats[trainer].platz123++;
        }
      }
    });

    const trainerProbs = Object.entries(trainerStats).map(([trainer, stats]) => ({
      trainer,
      p1: stats.platz1 / stats.total,
      p123: stats.platz123 / stats.total,
    }));

    const sortedByP1 = trainerProbs.sort((a, b) => b.p1 - a.p1).slice(0, 5);
    const sortedByP123 = trainerProbs.sort((a, b) => b.p123 - a.p123).slice(0, 5);

    return { sortedByP1, sortedByP123 };
  };

  const calculateOwnerProbabilities = (data, starters) => {
    const ownerStats = {};
    const startersSet = new Set(starters.map(starter => starter.owner));

    data.forEach(item => {
      if (startersSet.has(item.besitzer)) {
        const owner = item.besitzer;
        if (!ownerStats[owner]) {
          ownerStats[owner] = { total: 0, platz1: 0, platz123: 0 };
        }
        ownerStats[owner].total++;
        if (item.platz === '1') {
          ownerStats[owner].platz1++;
        }
        if (['1', '2', '3'].includes(item.platz)) {
          ownerStats[owner].platz123++;
        }
      }
    });

    const ownerProbs = Object.entries(ownerStats).map(([owner, stats]) => ({
      owner,
      p1: stats.platz1 / stats.total,
      p123: stats.platz123 / stats.total,
    }));

    const sortedByP1 = ownerProbs.sort((a, b) => b.p1 - a.p1).slice(0, 5);
    const sortedByP123 = ownerProbs.sort((a, b) => b.p123 - a.p123).slice(0, 5);

    return { sortedByP1, sortedByP123 };
  };

  const calculateProbabilities = (data) => {
    const filteredData = data.filter(item => item.evq < 3.0);

    const totalFiltered = filteredData.length;
    if (totalFiltered === 0) return { p1: 0, p123: 0 };

    const platz1Count = filteredData.filter(item => item.platz === '1').length;
    const platz123Count = filteredData.filter(item => ['1', '2', '3'].includes(item.platz)).length;

    const p1 = platz1Count / totalFiltered;
    const p123 = platz123Count / totalFiltered;

    return { p1, p123 };
  };

  const calculateBoxProbabilities = (data) => {
    const boxStats = {};

    data.forEach(item => {
      if (item.box !== 'nan') {
        const box = Number(item.box);
        if (!boxStats[box]) {
          boxStats[box] = { total: 0, platz1: 0 };
        }
        boxStats[box].total++;
        if (item.platz === '1') {
          boxStats[box].platz1++;
        }
      }
    });

    const boxProbs = Object.entries(boxStats).map(([box, stats]) => ({
      box: Number(box),
      p1: stats.platz1 / stats.total,
    }));

    const sortedByBox = boxProbs.sort((a, b) => a.box - b.box);

    return sortedByBox;
  };


  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data || !probabilities || !topSires) {
    return <div>Loading...</div>;
  }

  const doughnutDataP1 = {
    labels: ['Platz 1'],
    datasets: [
      {
        data: [probabilities.p1, 1 - probabilities.p1],
        backgroundColor: [
          '#FF6384',
          'rgba(0, 0, 0, 0)'
        ],
        borderColor: 'rgba(0, 0, 0, 0)',
        hoverBackgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
      },
    ],
  };

  const doughnutDataP123 = {
    labels: ['Platz 1 or 2 or 3'],
    datasets: [
      {
        data: [probabilities.p123, 1 - probabilities.p123],
        backgroundColor: [
          '#36A2EB',
          'rgba(0, 0, 0, 0)'
        ],
        borderColor: 'rgba(0, 0, 0, 0)',
        hoverBackgroundColor: ['#36A2EB', 'rgba(0, 0, 0, 0)'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const lineData = {
    labels: boxProbabilities.map(box => box.box),
    datasets: [
      {
        label: 'Platz 1',
        data: boxProbabilities.map(box => box.p1 * 100),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Box',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: '(%)',
        },
        beginAtZero: true,
        suggestedMax: 40,
      },
    },
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const createBarData = (labels, data) => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#FF6384',
        borderWidth: 1.5,
      },
    ],
  });


  return (
    <div>
      <h1 className={styles.componentTitle}>Kursdatenanalyse für {location} {distance}</h1>
      <h2 className={styles.subHeader}>Vertrauen in Pferde mit einer Siegquote unter 3.0</h2>
      <div className={styles.doughnutContainer}>
        <div className={styles.doughNut}>
          <h2 className={styles.upperText}>Platz 1</h2>
          <div style={{ position: 'relative', height: '200px', width: '200px' }}>
            <Doughnut
              data={doughnutDataP1}
              options={options}
            />
            <div className={styles.centerText}>{(probabilities.p1 * 100).toFixed(1)}%</div>
          </div>
          <div className={styles.underText}>
            <span>Durchschnittswerte</span>
            <span>in Deutschland: 38.1%</span>
          </div>
        </div>
        <div className={styles.doughNut}>
          <h2 className={styles.upperText}>Platz 1-3</h2>
          <div style={{ position: 'relative', height: '200px', width: '200px' }}>
            <Doughnut
              data={doughnutDataP123}
              options={options}
            />
            <div className={styles.centerText}>{(probabilities.p123 * 100).toFixed(1)}%</div>
          </div>
          <div className={styles.underText}>
            <span>Durchschnittswerte</span>
            <span>in Deutschland: 77.7%</span>
          </div>
        </div>
      </div>
      <div className={styles.lineContainer}>
        {boxProbabilities && (
          <div className={styles.lineChart}>
            <h2 className={styles.subHeader}>Leistungen nach Startbox (Gewinnrate)</h2>
            <Line data={lineData} options={lineOptions} />
          </div>
        )}
      </div>
      <div className={styles.chartContainer}>
        <h2 className={styles.subHeader}>Leistungen je Sire / Dam-Sire (Top 5)</h2>
        <p>Platz 1 Sire</p>
        <div className={styles.barChart}>
          <Bar
            data={createBarData(
              topSires.sortedSireByP1.map(sire => sire.sire),
              topSires.sortedSireByP1.map(sire => (sire.p1 * 100).toFixed(1))
            )}
            options={barOptions}
          />
        </div>
        <p>Platz 1 Dam-Sire</p>
        <div className={styles.barChart}>
          <Bar
            data={createBarData(
              topSires.sortedDamsireByP1.map(damsire => damsire.damsire),
              topSires.sortedDamsireByP1.map(damsire => (damsire.p1 * 100).toFixed(1))
            )}
            options={barOptions}
          />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <h2 className={styles.subHeader}>Leistungen je Reiters (Top 5)</h2>
        <p>Platz 1</p>
        <div className={styles.barChart}>
          <Bar
            data={createBarData(
              topReiters.sortedByP1.map(reiter => reiter.reiter),
              topReiters.sortedByP1.map(reiter => (reiter.p1 * 100).toFixed(1))
            )}
            options={barOptions}
          />
        </div>
        <p>Platz 1-3</p>
        <div className={styles.barChart}>
          <Bar
            data={createBarData(
              topReiters.sortedByP123.map(reiter => reiter.reiter),
              topReiters.sortedByP123.map(reiter => (reiter.p123 * 100).toFixed(1))
            )}
            options={barOptions}
          />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <h2 className={styles.subHeader}>Leistungen je Trainers (Top 5)</h2>
        <p>Platz 1</p>
        <div className={styles.barChart}>
          <Bar
            data={createBarData(
              topTrainers.sortedByP1.map(trainer => trainer.trainer),
              topTrainers.sortedByP1.map(trainer => (trainer.p1 * 100).toFixed(1))
            )}
            options={barOptions}
          />
        </div>
        <p>Platz 1-3</p>
        <div className={styles.barChart}>
          <Bar
            data={createBarData(
              topTrainers.sortedByP123.map(trainer => trainer.trainer),
              topTrainers.sortedByP123.map(trainer => (trainer.p123 * 100).toFixed(1))
            )}
            options={barOptions}
          />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <h2 className={styles.subHeader}>Leistungen je Owners (Top 5)</h2>
        <p>Platz 1</p>
        <div className={styles.barChart}>
          <Bar
            data={createBarData(
              topOwners.sortedByP1.map(owner => owner.owner),
              topOwners.sortedByP1.map(owner => (owner.p1 * 100).toFixed(1))
            )}
            options={barOptions}
          />
        </div>
        <p>Platz 1-3</p>
        <div className={styles.barChart}>
          <Bar
            data={createBarData(
              topOwners.sortedByP123.map(owner => owner.owner),
              topOwners.sortedByP123.map(owner => (owner.p123 * 100).toFixed(1))
            )}
            options={barOptions}
          />
        </div>
      </div>
      <div className={styles.timeStamp}>(Daten von 2019 bis heute)</div>
    </div>
  );
}
