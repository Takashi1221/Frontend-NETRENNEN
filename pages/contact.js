import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import styles from '/styles/Company/Contact.module.css';
import { Header } from '../components/Header';
import { LoginModal } from '../components/Home/LoginModal';
import { Footer } from '/components/Footer';


export default function ContactForm () {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, message }; // 送信するデータ
        console.log('Sending:', data); // コンソールに送信データを出力
    
        const res = await fetch('/api/send-message/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        if (res.ok) {
            setSubmitted(true); 

        } else {
            alert('Error sending message.');
            console.error('Failed to send message:', await res.json()); 
        }
    };

    return (
        <div className={styles.body}>
            <Header />
            <LoginModal />
            <div className={styles.pageContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerText}>Kontakt</div>
                </div>
                <div className={styles.headerBackground}></div>
                <div className={styles.bodyContainer}>
                    {submitted ? (
                        // 送信後のメッセージ表示
                        <div className={styles.formContainer}>
                            <div className={styles.sendSuccessed}>
                                <p className={styles.sendSuccessedText}>Vielen Dank für Ihre Kontaktaufnahme!</p>
                                <p className={styles.sendSuccessedText}>Bitte warten Sie auf eine Antwort ...</p>
                            </div>
                        </div>
                    ) : (
                        // 通常のフォーム表示
                        <div className={styles.formContainer}>
                            <div className={styles.formBodyContainer}>
                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                    <TextField
                                        label="E-Mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        required
                                        variant="standard"
                                        sx={{
                                            ...styles.textField,
                                            '& label.Mui-focused': { // フォーカス時のラベルテキストの色
                                                color: '#3CB371',
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: '#3CB371', // フォーカス時の下線の色
                                            },
                                        }}
                                    />
                                    <TextField
                                        label="Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        fullWidth
                                        required
                                        variant="standard"
                                        multiline
                                        rows={6}
                                        sx={{
                                            ...styles.textField,
                                            my: 4,  // 上下にマージンを追加。3はテーマのspacing関数に依存する値です
                                            '& label.Mui-focused': { // フォーカス時のラベルテキストの色
                                                color: '#3CB371',
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: '#3CB371', // フォーカス時の下線の色
                                            },
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3, 
                                            mb: 2,
                                            backgroundColor: '#1FC613 !important', 
                                            '&:hover': { 
                                                backgroundColor: '#3CB371 !important' 
                                            }
                                        }}
                                    >
                                        Absenden
                                    </Button>
                                </Box>
                            </div>
                            <div className={styles.formHeader}>
                                <p>Anfragen, Fragen oder jegliche Kontaktaufnahme sind willkommen!</p>
                                <p>Sie erhalten innerhalb von drei Tagen eine Antwort.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}