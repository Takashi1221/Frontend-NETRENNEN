import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { useAuth } from '/context/AuthContext';
import styles from "../../styles/Login/LoginPage.module.css";


export function LoginModal() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { open, handleClose, login, authError } = useAuth();
    const onSubmit = async (data) => {
        await login(data.username, data.password);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper', // Material-UIがデフォルトで提供する背景色
                    border: '2px solid #000', // 例: 枠線を黒で設定
                    boxShadow: 24, // 影の強度
                    p: 4 // パディング
                }}
            >
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    {authError && (
                        <Typography variant='body2' color='error'>
                            {authError}
                        </Typography>
                    )}{" "}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Benutzername"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        {...register("username", { required: "Benutzernamen erforderlich." })}
                        error={Boolean(errors.username)}
                        helperText={errors.username?.message}
                        sx={{
                            '& .MuiInputLabel-outlined': {
                                transform: 'translate(14px, -1.5px) scale(1)', // ラベルテキストの位置調整
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -14px) scale(0.75)' // フォーカス時のラベルテキストの位置調整
                                }
                            },
                            '& label.Mui-focused': { // フォーカス時のラベルテキストの色
                                color: '#66BB6A',
                            },
                            '& .MuiOutlinedInput-root': { // フォーカス時の枠線の色
                                '&.Mui-focused fieldset': {
                                    borderColor: '#66BB6A',
                                },
                            },
                            '& .MuiInputBase-input': { // ここで input 要素に直接スタイルを適用
                                paddingLeft: '10px' // 左側のパディングを設定
                            }
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Passwort"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", { required: "Passworte erforderlich." })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        sx={{
                            '& .MuiInputLabel-outlined': {
                                transform: 'translate(14px, -1.5px) scale(1)',
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -14px) scale(0.75)'
                                }
                            },
                            '& label.Mui-focused': {
                                color: '#66BB6A',
                            },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#66BB6A',
                                },
                            },
                            '& .MuiInputBase-input': {
                                paddingLeft: '10px'
                            }
                        }}
                    />
                    <Button
                        className={styles.customButton}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Modal>         
    );
}