import React, { useState } from 'react';
import styles from '/styles/Account/FinishProgressSteps.module.css';


const steps = [
  { label: 'Erstellen', step: 1, },
  { label: 'Infos', step: 2, },
  { label: 'ABO-Plan', step: 3, },
  { label: 'Fertig', step: 4, },
]

export const FinishProgressSteps = ({ paymentResult }) => {
  const [activeStep, setActiveStep] = useState(5)

  const totalSteps = steps.length;
  const progressBarWidth = `95%`;

  // 各フォームコンポーネントのonSubmitイベントにnextStep関数を割り当て
  return (
    <div className={styles.mainContainer}>
      <div className={styles.stepContainer}>
      {/* 固定された背景のバー */}
      <div className={styles.containerBefore} />
      {/* 進捗に応じて幅が変わる色付きのバー */}
      <div className={`${styles.containerAfter}`} style={{ width: progressBarWidth }} />
        {steps.map(({ step, label }) => (
          <div key={step} className={styles.stepWrapper}>
            <div className={`${styles.stepStyle} ${activeStep >= step ? styles.stepStyleCompleted : ''}`}>
              {activeStep > step ? (
                <div className={styles.checkMark}>✓</div>
              ) : (
                <span className={styles.stepCount}>{step}</span>
              )}
            </div>
            <div className={styles.stepsLabelContainer}>
              <span className={styles.stepLabel}>{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};