import styles from './home.module.scss'
import { Credit } from '../Credit/Credit'
import { StatSVG } from "./StatSVG"

export const Home = ({ stats }: any) => {

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.mainContent}>
                <div className={styles.top}>
                    <div className={styles.topLeft}>
                        <h3>Hey there <span className={styles.username}>{stats.username}</span></h3>
                        <p>Thanks for waiting!<br/> Here's your <span className={styles.highlight}>GitHubStats</span> image:</p>
                        <div className={styles.downloadButton}>
                            <button>Download Image</button>
                        </div>
                    </div>

                    <div className={styles.topRight}>
                        <StatSVG stats={stats}/>
                    </div>
                </div>

                < hr />

                <div className={styles.extraInfo}>
                    <p>If you wish to display your <span className={styles.highlight}>GitHubStats</span> image on your GitHub profile, follow these easy steps: </p>
                    <ol>
                        <li>Create a public repository, that has the <span className={styles.bolden}>same name</span> as your GitHub username.</li>
                        <li>Initialise that repository with a readme.md. The readme.md will automatically display on your profile.</li>
                        <li>Place your <span className={styles.highlight}>GitHubStats</span> SVG into this readme.md</li>
                        <li>Enjoy showing off your commits!</li>
                    </ol>
                </div>

                <Credit />
            </div>
        </div>
    )
}