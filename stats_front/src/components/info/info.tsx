import { StackedBar } from './stackedbar'
import { BarNames } from './barnames'
import styles from './info.module.scss'

export const InfoLayout = (userInfo: any) => {
    const info = userInfo.userInfo
    const langs = info.stats.mostUsedLangs.slice(0, 5)

    return (
        <div className={styles.userInfoWrapper}>
            <img className={styles.userPicture} src={info.avatar} alt="avatar" />
            <div className={styles.userWrapper}>
                <h4>{info.username}'s GitHub Stats</h4>
                <h4 className={styles.langTitle}>Most used Languages:</h4>
                <div className={styles.langs}>
                    <StackedBar langs={langs} />
                    <BarNames langs={langs} />
                </div>
                <h4 className={styles.infoTitle}>Total Commits: <span className={styles.highLightText}>{info.stats.totalCommits}</span></h4>
                <h4 className={styles.infoTitle}>Total Repos: <span className={styles.highLightText}>{info.stats.totalRepos}</span></h4>
            </div>
        </div>
    )
}