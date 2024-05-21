import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import parse, { domToReact } from 'html-react-parser';
import { Header } from '../../components/Header';
import { LoginModal } from '../../components/Home/LoginModal';
import { Footer } from '../../components/Footer';
import styles from '/styles/News/NewsArticle.module.css';


const formatDateToGerman = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};


const replaceLinks = (domNode) => {
    // <a>タグにスタイルを適用
    if (domNode.name === 'a' && domNode.attribs && domNode.attribs.href) {
        return (
            <Link href={domNode.attribs.href} passHref  className={styles.linkColor}>
                {domToReact(domNode.children, { replace: replaceLinks })}
            </Link>
        );
    }

    // <p>タグにスタイルを適用
    if (domNode.name === 'p') {
        return (
            <p className={styles.paragraphStyle}>
                {domToReact(domNode.children, { replace: replaceLinks })}
            </p>
        );
    }
};


const NewsArticle = () => {

    const router = useRouter();
    const { id } = router.query; // URLからidを取得
    const [articleDetail, setArticleDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await axios.get(`/api/get-article/?id=${id}`);
            // レスポンスからデータをセット
            setArticleDetail(response.data);
            console.log(response.data)
          } catch (error) {
            console.error("データの取得に失敗しました:", error);
            // エラーハンドリング
          } finally {
            setLoading(false);
          }
        };
    
        if (id) {
          fetchData();
        }
      }, [id]);

    if (loading) {
    return <div>Loading...</div>;
    }


    const content = parse(articleDetail[0].content, { replace: replaceLinks });
  

    return (
    <div className={styles.body}>
        <Header />
        <LoginModal />
        <div className={styles.pageContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.headerText}>Artikel</div>
            </div>
            <div className={styles.headerBackground}></div>
            <div className={styles.bodyContainer}>
                <h1 className={styles.title}>{articleDetail[0].title}</h1>
                <p className={styles.date}>{formatDateToGerman(articleDetail[0].date)}</p>
                <img className={styles.image} src={articleDetail[0].image_url} alt={articleDetail[0].title} />
                <p>{content}</p>
            </div>
        </div>
        <Footer />
    </div>
    );
};


export default NewsArticle;