import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from 'styles/News/ArticlePost.module.css'


const ArticleOpacho = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [gernre, setGernre] = useState('');


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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      date,
      title,
      description,
      content,
      image_url: imageUrl,
      is_large: false,
      gernre
    };

    console.log(dataToSubmit)

    const response = await fetch('/api/post-article/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    if (response.ok) {
      alert('成功しました！');
    } else {
      alert('送信失敗です。。。');
    }
  };

  const handleReset = () => {
    setDate('');
    setTitle('');
    setDescription('');
    setContent('');
    setImageUrl('');
    setGernre('');
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

  return (
    <div className={styles.backGround}>
      <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>日付:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>タイトル:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>概要:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>本文:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="15"
            />
          </div>
          <div className={styles.formGroup}>
            <label>画像URL:</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>ジャンル:</label>
            <input
              type="text"
              value={gernre}
              onChange={(e) => setGernre(e.target.value)}
              required
            />
          </div>
          <div className={styles.submitBlock}>
            <button type="submit">記事投稿！</button>
            <button type="button" onClick={handleReset}>別の記事を作成</button>
          </div>
        </form>
      </div>
      <div>
        <span>href="/results/"<br></br></span>
        <span>href="/horse/"<br></br></span>
        <span>Ergebnis<br></br></span>
      </div>
    </div>
  );
};

export default ArticleOpacho;