import { Button } from "../Button"
import styles from './login.module.scss'

export const LoginError = () => {
    const clearCookies = () => {
        const cookies = document.cookie.split('; ')
        for (const c of cookies) {
            const d = window.location.hostname.split('.')
            while (d.length > 0) {
                const cookieBase = `${encodeURIComponent(c.split(';')[0].split('=')[0])}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=${d.join('.')} ;path=`
                const pathSplit = window.location.pathname.split('/')
                document.cookie = `${cookieBase}/`
                while(pathSplit.length > 0) {
                    document.cookie = `${cookieBase}${pathSplit.join('/')}`
                    pathSplit.pop()
                }
                d.shift()
            }
        }

        window.location.reload()
    }

    return (
        <div className={styles.errorWrapper}>
            <h4>An error has occured, please clear your cookies and click the button below to reload.</h4>
            <Button onClick={clearCookies}>Reload</Button>
        </div>
    )
}