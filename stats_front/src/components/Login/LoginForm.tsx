import styles from './login.module.scss'
import { Credit } from '../Credit/Credit'

export const LoginForm = ({handleLogin}:any) => {
    return (
        <div className={styles.loginForm}>
            <h1>GithubStats Application</h1>
            <p>Welcome to the <span className={styles.title}>GithubStats Application</span>. We generate an simple stylised image to show off your GitHub stats wherever you wish.</p>
            <div className={styles.list}>
                <p>To do so, we collect:</p>
                <ul>
                    <li>Your <span className={styles.highlight}>username</span></li>
                    <li>Your <span className={styles.highlight}>avatar</span>'s url</li>
                    <li>The number of <span className={styles.highlight}>repositories</span> you've contributed to (public and private)</li>
                    <li>The number of <span className={styles.highlight}>commits</span> you've made to those repositories</li>
                    <li>The amount of each <span className={styles.highlight}>language</span> used in the repositories (measure in bytes)</li>
                </ul>
            </div>
            <p>We use this information to create an infographic to display the aforementioned stats. <br />If you're okay with all of that, please login!</p>
            <div className={styles.loginFormButton}>
                <button onClick={handleLogin}>Authorise App</button>
            </div>
            <Credit />
        </div>
    )
}