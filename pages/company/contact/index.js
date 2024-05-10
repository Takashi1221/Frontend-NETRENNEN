import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import styles from '/styles/Account/SignUp.module.css'; // 既存のスタイルシートを利用
import { Header } from '../../../components/Header';
import { LoginModal } from '../../../components/Home/LoginModal';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // ここにAPIコールを記述するか、フォームの送信処理を行う
            console.log("Message sent:", { name, email, message });
            // 成功時の処理
        } catch (err) {
            console.error(err);
            setError('An error occurred while sending the message.');
        }
    };

    return (
        <div>
            <Header />
            <LoginModal />
            <div className={styles.mainFormContainer}>
                <Typography variant="h6" sx={{ textAlign: 'center', color: '#f3ede4', mb: 2 }}>
                    Kontaktieren Sie uns
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        variant="standard"
                        sx={styles.textField}
                    />
                    <TextField
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        variant="standard"
                        sx={styles.textField}
                    />
                    <TextField
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                        required
                        variant="standard"
                        multiline
                        rows={4}
                        sx={styles.textField}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Message
                    </Button>
                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                </Box>
            </div>
        </div>
    );
};

export default ContactForm;