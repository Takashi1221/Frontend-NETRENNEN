import styles from '/styles/Horse/HorsePage.module.css'
import { Header } from '../../components/Header';
import { LoginModal } from '../../components/Home/LoginModal';
import { Footer } from '../../components/Footer';
import { HorseMenuTabs } from '../../components/Horse/TabMenu';


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