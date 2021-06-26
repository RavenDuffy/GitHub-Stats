import styles from './login.module.scss'

export const LoginForm = ({handleLogin}:any) => {
    return (
        <div className={styles.loginForm}>
            <h1>hi</h1>
            <button onClick={handleLogin}>Authorise App</button>
        </div>
    )
}