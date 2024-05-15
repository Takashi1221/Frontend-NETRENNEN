import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from 'styles/Opacho.module.css'

const AdminOpacho = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [results, setResults] = useState([]);
  const [passingOrder, setPassingOrder] = useState({});
  const [comments, setComments] = useState({});


  const handleLogin = async () => {
    const response = await fetch('/api/opacho-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(email, password)

    if (response.ok) {
      setIsAuthenticated(true);
      console.log('its okayyy')
    } else {
      alert('Authentication failed');
    }
  };


  const fetchResultsByDate = async (date) => {
    // ローカルタイムゾーンの日付をそのままフォーマット
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // 月は0から始まるため+1
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const response = await fetch(`/api/resultsall?date=${formattedDate}`);
    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }
    const result = await response.json();
    console.log(result)
    setResults(result);

    const initialPassingOrder = {};
    const initialComments = {};
    result.forEach(item => {
        if (item.passing_order) {
            initialPassingOrder[item.race_horse_id] = item.passing_order;
        }
        if (item.comment) {
            initialComments[item.race_horse_id] = item.comment;
        }
    });
    setPassingOrder(initialPassingOrder);
    setComments(initialComments);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchResultsByDate(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handlePassingOrderChange = (raceHorseId, value) => {
    setPassingOrder({
      ...passingOrder,
      [raceHorseId]: value,
    });
  };

  const handleCommentChange = (raceHorseId, value) => {
    setComments({
      ...comments,
      [raceHorseId]: value,
    });
  };

  const handlePassingOrderSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {};
    for (let raceHorseId in passingOrder) {
      dataToSubmit[raceHorseId] = {
        passing_order: passingOrder[raceHorseId],
        comment: comments[raceHorseId],
      };
    }
    const response = await fetch('/api/passing-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    if (response.ok) {
      alert('通過順の更新に成功しました！');
    } else {
      alert('編集結果送信失敗です。。。');
    }
  };

  const getUniqueOrts = () => {
    const orts = results.map(result => result.ort);
    return [...new Set(orts)];
  };

  const getUniqueThisRaceNr = (ort) => {
    const raceNrs = results
      .filter(result => result.ort === ort)
      .map(result => result.this_race_nr);
      return [...new Set(raceNrs)].sort((a, b) => a - b);
  };

  const getRaceDistance = (ort, raceNr) => {
    const race = results.find(result => result.ort === ort && result.this_race_nr === raceNr);
    return race ? race.distanz : '';
  };

  const renderResultsByOrtAndRaceNr = (ort, raceNr) => {
    // レース番号ごとにフィルタし、result.platzでソート
    const sortedResults = results
      .filter(result => result.ort === ort && result.this_race_nr === raceNr)
      .sort((a, b) => a.platz - b.platz);
    return sortedResults.map((result, index) => (
        <tr key={index}>
          <td className={styles.marginLeft}>{result.platz}</td>
          <td className={styles.marginLeft}>({result.number})</td>
          <td className={styles.marginLeft}>{result.name}</td>
          <td className={styles.marginLeft}>{result.race_time}</td>
          <td className={styles.marginLeft}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="----"
              value={passingOrder[result.race_horse_id] || ''}
              onChange={(e) => handlePassingOrderChange(result.race_horse_id, e.target.value)}
            />
          </td>
          <td className={styles.marginLeft}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="----"
              value={comments[result.race_horse_id] || ''}
              onChange={(e) => handleCommentChange(result.race_horse_id, e.target.value)}
            />
          </td>
          <td className={styles.marginLeft}>{result.race_horse_id}</td>
        </tr>
      ));
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginForm}>
        <div className={styles.loginBody}>
            <div className={styles.loginMarginTop}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.loginMarginTop}>
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.loginButton}>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
      </div>
    );
  }

  const uniqueOrts = getUniqueOrts();

  return (
    <div className={styles.backGround}>
        <div className={styles.calenderBlock}>
            <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
        <div className={styles.mainContainer}>
            <h2>Results for… {selectedDate.toDateString()}</h2>
            {uniqueOrts.map((ort, ortIndex) => (
                <div key={ortIndex}>
                <h3 className={styles.ortBlock}>{ort}</h3>
                {getUniqueThisRaceNr(ort).map((raceNr, raceNrIndex) => (
                    <div key={raceNrIndex}>
                    <h4 className={styles.raceBlock}>{raceNr}R ..... ({getRaceDistance(ort, raceNr)})</h4>
                    <table>
                        <thead>
                        <tr>
                            <th className={styles.marginLeft}>着順</th>
                            <th className={styles.marginLeft}>馬番</th>
                            <th className={styles.marginLeft}>馬名</th>
                            <th className={styles.marginLeft}>タイム</th>
                            <th className={styles.marginLeft}>通過順</th>
                            <th className={styles.marginLeft}>コメント</th>
                            <th className={styles.marginLeft}>レース馬ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderResultsByOrtAndRaceNr(ort, raceNr)}
                        </tbody>
                    </table>
                    </div>
                ))}
                </div>
            ))}
        </div>
        <div className={styles.submitBlock}>
            <button onClick={handlePassingOrderSubmit}>編集結果送信！</button>
        </div>
    </div>
  );
};

export default AdminOpacho;