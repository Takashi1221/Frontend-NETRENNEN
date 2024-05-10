import { Header } from "../../components/Header";
import { LoginModal } from '../../components/Home/LoginModal';
import styles from '/styles/News/News.module.css'



const NewsTop = () => {
    

    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.headerText}>
                    NEWS
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.articleContainer}>Article 1</div>
                    <div className={styles.articleContainer}>Article 2</div>
                    <div className={styles.articleContainer}>Article 3</div>
                </div>
            </div>
        </div>
    );
};

export default NewsTop;