import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import { HeaderLanding } from '../../../components/Header/HeaderLanding';
import { LoginModal } from '../../../components/Header/LoginModal';
import { EmailAndPasswordForm } from '../../../components/Account/EmailPwForm';
import styles from '/styles/Account/SignUp.module.css'


const SignUp = () => {
    const { checkAuthSignUp } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        country: '',
    });

    // フォームの変更をハンドリング
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // APIエンドポイントへのPOSTリクエスト
    const submitData = async (e) => {
        e.preventDefault(); // デフォルトのフォーム送信を防ぐ
        if (formData.email && formData.password && formData.country) {
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
                // 成功した場合、EmailをLocalStorageに保存
                localStorage.setItem('userEmail', formData.email);
                // トークン取得してリダイレクト
                await checkAuthSignUp();

            } catch (error) {
                console.log(formData);
            }
        } else {
            console.log(formData);
        }
    };


    return (
        <div className={styles.backgroundSlider}>
            <HeaderLanding />
            <LoginModal />
            <div className={styles.backgroundContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.leftTextSpace}>
                        <h2>netrennen</h2>
                        <ul className={styles.bulletList}>
                            <li>Nach der Registrierung können Sie den Dienst sofort kostenlos nutzen.</li>
                            <li>Umfangreiche Informationen zu den Rennleistungen und Abstammungen der Pferde.</li>
                            <li>Sie können auch Nachrichtenartikel lesen.</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <EmailAndPasswordForm 
                        onSubmit={submitData} 
                        formData={formData} 
                        handleChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

// サーバーサイドでクッキーをチェックし、リダイレクト
export async function getServerSideProps({ req }) {
    const { cookies } = req;
    const token = cookies.access;

    if (token) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    return {
        props: {}, // 必要な場合に他のプロパティを追加
    };
}

export default SignUp;