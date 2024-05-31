import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Header } from '../../../components/Header/Header';
import { LoginModal } from '../../../components/Header/LoginModal';
import { Footer } from '../../../components/Header/Footer';
import { CheckOut } from '../../../components/Payment/CheckoutForm';
import CheckIcon from '@mui/icons-material/Check';
import styles from '/styles/Account/Premium.module.css';


const plans = [
  {
    type: 'Basic',
    price: '€ 0,00',
    period: '/Monat',
    features: [
      'Renndaten bis zu 3 Rennen',
      'Pedigree des Pferdes',
      'Leistung des Pferdes',
      'Artikel über Pferderennen'
    ],
    popular: false,
  },
  {
    type: 'Premium',
    price: '€ 15,00',
    period: '/Monat',
    features: [
      'Vollständige Renndaten',
      'Datenanalyse',
      'Pedigree des Pferdes',
      'Leistung des Pferdes',
      'Artikel über Pferderennen',
      'Viele zukünftige Ergänzungen'
    ],
    popular: true,
    description: 'Erster Monat kostenlos!'
  }
].reverse(); // ここで逆順にする

const PlanCard = ({ plan }) => (
  <div className={plan.popular ? styles.subscContainer2 : styles.subscContainer1}>
    {plan.popular && <div className={styles.beliebtFlame}>Am beliebtesten!</div>}
    <div className={styles.priceContainer}>
      <p className={styles.priceHeaderText}>{plan.type}</p>
      <p className={styles.priceVolumeText}>{plan.price}</p>
      <p className={styles.priceMonatText}>{plan.period}</p>
    </div>
    <div className={styles.aboButtonContainer}>
      {plan.type === 'Premium' && <p><CheckOut /></p>}
      {plan.description && <p className={styles.stripeDiscription}>{plan.description}</p>}
    </div>
    <div className={styles.aboDiscriptionContainer}>
      {plan.features.map((feature, index) => (
        <div key={index} className={styles.aboDiscriptionRow}>
          <CheckIcon sx={{ fontSize: '1.6rem', paddingBottom: '5px', marginRight: '10px' }} />
          <p>{feature}</p>
        </div>
      ))}
    </div>
  </div>
);

const Premium = () => {
  return (
    <div className={styles.backgroundContainer}>
      <Header />
      <LoginModal />
      <div className={styles.pageContainer}>
        <div className={styles.pageTitle}>
          <h2>netrennen Premium</h2>
          <p>Abonniere jetzt und erlebe unseren leistungsstarken Service in vollem Umfang</p>
        </div>
        <div className={styles.pageMainContainer}>
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
        <div className={styles.swipeContainer}>
          <Swiper
            freeMode={true}
            grabCursor={true}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={30}
          >
            {plans.map((plan, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <PlanCard plan={plan} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.subscAttention}>
          <p>Der Premium-Plan ist im ersten Monat kostenlos. Nach der Anmeldung wird die Gebühr ab dem Anmeldedatum monatlich zu Beginn des Monats abgebucht. Auch nach einer Kündigung behalten Sie die Mitgliedsrechte für den bereits bezahlten Zeitraum. Die Kündigung ist jederzeit möglich.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Premium;