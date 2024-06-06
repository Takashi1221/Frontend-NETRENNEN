import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Header } from "../../components/Header/Header";
import { LoginModal } from '../../components/Header/LoginModal';
import { Footer } from "../../components/Header/Footer";
import styles from '/styles/News/News.module.css'



const NewsTop = () => {
    const [articles, setarticles] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`/api/get-article/`);
            // レスポンスからデータをセット
            console.log(response.data)

            // 日付順にソート
            const sortedArticles = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            // 最初の配列のis_large値をTrueに設定
            if (sortedArticles.length > 0) {
            sortedArticles[0].is_large = true;
            }
            setarticles(sortedArticles)
          } catch (error) {
            console.error("データの取得に失敗しました:", error);
            // エラーハンドリング
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, []);

    if (loading) {
    return <div>Loading...</div>;
    }


    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerText}>Galopp-News</div>
                </div>
                <div className={styles.headerBackground}></div>

                <div className={styles.bodyContainer}>
                    <div className={styles.grid}>
                        {articles.map((article, index) => (
                        <Link href={`/news/${article.id}`} className={article.is_large ? styles.largeCard : styles.card}>
                        <div key={article.id}>
                            <div className={styles.imageContainer}>
                                <img src={article.image_url} alt={article.title} className={styles.image} />
                            </div>
                            <div className={styles.text}>
                                <h2>{article.title}</h2>
                                {article.is_large && <p>{article.description}</p>}
                                <p className={styles.endElement}>
                                    <span className={styles.date}>{article.date}</span>
                                    <span className={styles.genre}>{article.gernre}</span>
                                </p>
                            </div>
                        </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )  
}

export default NewsTop;