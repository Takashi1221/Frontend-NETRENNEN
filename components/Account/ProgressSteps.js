import React, { useState, useEffect } from 'react';
import { useAuth } from '/context/AuthContext';
import { EmailAndPasswordForm } from './EmailPwForm';
import { AdditionalInfoForm } from './AddInfoForm';
import { SubscriptionOption } from './Step-of-Subsc';
import styles from '/styles/Account/ProgressSteps.module.css';


const steps = [
  {
    label: 'Erstellen',
    step: 1,
  },
  {
    label: 'Infos',
    step: 2,
  },
  {
    label: 'ABO-Plan',
    step: 3,
  },
  {
    label: 'Fertig',
    step: 4,
  },
]

export const ProgressSteps = () => {
  const [activeStep, setActiveStep] = useState(0)
  const { checkAuthSignUp } = useAuth();

  // フォームデータの状態
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    age_group: '',
    residence_area: '',
  });

  // APIエンドポイントへのPOSTリクエスト
  const submitData = async () => {
    if (formData.nickname !== '' && formData.age_group !== '' && formData.residence_area !== '') {
        try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // 成功した場合の処理
        localStorage.setItem('userEmail', data.email);
        await checkAuthSignUp();

        } catch (error) {
        console.error('サインアップ中にエラーが発生しました:', error);
        console.log(formData);
        }
    }  else {
        console.log('フォームデータが全て埋まっていません');
        console.log(formData);
    }
  };
  
  // 次のステップへの処理
  const nextStep = () => {
    // ２ステップ目でフォームデータ送信
    switch (activeStep) {
      case 2:
        submitData();
      // 現在のステップに応じた処理
      default:
        setActiveStep(activeStep + 1);
    }
  };

  // EmailAndPasswordFormのonSubmit処理
  const handleEmailAndPasswordSubmit = (email, password) => {
    updateFormData('email', email);
    updateFormData('password', password);
  };

  // AdditionalInfoFormのonSubmit処理
  const handleAdditionalInfoSubmit = (nickname, age_group, residence_area) => {
    updateFormData('nickname', nickname);
    updateFormData('age_group', age_group);
    updateFormData('residence_area', residence_area);
  };

  // フォームデータの更新処理
  const updateFormData = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    // formDataが更新されたら次のステップへ進む
    nextStep();
  }, [formData]);

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const totalSteps = steps.length;
  const progressBarWidth = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

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
      <div className={styles.formContainer}>
        {activeStep === 1 && <EmailAndPasswordForm onSubmit={handleEmailAndPasswordSubmit} />}
        {activeStep === 2 && <AdditionalInfoForm onSubmit={handleAdditionalInfoSubmit} onPrevStep={prevStep} />}
        {activeStep === 3 && <SubscriptionOption onSubmit={nextStep}  />}
      </div>

    </div>
  );
};