import styles from './info.module.scss'

export const InfoLayout = (userInfo: any) => {
    const info = userInfo.userInfo

    return (
        <div className='user-info-wrapper'>
            <img src={info.avatar} alt="avatar" />
            <h4 className={styles.username}>{info.username}</h4>
            {info.stats.mostUsedLangs.map((el:any) => {
                return <h5 key={el.name}>{el.name} {el.usageNum}</h5>
            })}
        </div>
    )
}