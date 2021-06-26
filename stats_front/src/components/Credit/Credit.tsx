import styles from './credit.module.scss'

export const Credit = () => {
    return (
        <p className={styles.credit}>By <a href="https://github.com/RavenDuffy">Raven Duffy</a> {'&'} <a href="https://github.com/SAndersonCheung">Summer Anderson-Cheung</a></p>
    )
}