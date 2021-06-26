import styles from './home.module.scss'
import { Credit } from '../Credit/Credit'
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

            <Credit />
        </div>
    )
}