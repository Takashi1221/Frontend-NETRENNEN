import { Header } from '../../components/Header/Header';
import { LoginModal } from '../../components/Header/LoginModal';
import { Footer } from '../../components/Header/Footer';
import { HorseMenuTabs } from '../../components/Horse/TabMenu';
import styles from '/styles/Horse/HorsePage.module.css';


function HorsePage() {

  return (
    <div className={styles.body}>
      <Header />
      <LoginModal />
  
      <HorseMenuTabs />

      <Footer />
    </div>
  );
}
export default HorsePage;