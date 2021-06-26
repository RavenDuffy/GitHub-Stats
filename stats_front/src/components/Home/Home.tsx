import styles from './home.module.scss'
import { StatSVG } from "./StatSVG"

export const Home = ({ stats }: any) => {

    return (
        <div className={styles.mainContent}>
            <h3>Hey there {stats.username}</h3>
            <p>Thanks for waiting!<br/> Here's your GitHubStats image:</p>
            <StatSVG stats={stats}/>
            

            <div className={styles.downloadButton}>
                <button>Download Image</button>
            </div>
            
            <div className={styles.extraInfo}>
                <p>The card is cool.</p>
            </div>

            <p className={styles.credit}>By <a href="https://github.com/RavenDuffy">Raven Duffy</a> & <a href="https://github.com/SAndersonCheung">Summer Anderson-Cheung</a></p>
        </div>
    )
}