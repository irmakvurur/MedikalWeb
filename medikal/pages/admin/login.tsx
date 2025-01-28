import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from './login.module.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            username: username || '', // name değeri tanımlı olmalı
            password: password || '', // password değeri tanımlı olmalı
        });

        if (result?.error) {
            // Hata durumunda gerekli işlemleri yapabilirsiniz
            console.error('Giriş hatası:', result.error);
        } else {
            // Başarılı girişte yönlendirme yapabilirsiniz
            window.location.href = '/admin'; // Anasayfaya yönlendirme
        }
    };

    return (
        <div className={styles.body}>
            <h1 className={styles.h1}>Giriş Yap</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label className={styles.label}>Ad:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <label className={styles.label}>Şifre:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <button className={styles.button} type="submit">Giriş Yap</button>
            </form>
        </div>
    );
};

export default Login;
