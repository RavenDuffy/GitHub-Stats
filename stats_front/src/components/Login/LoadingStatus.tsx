import { useEffect, useState } from "react"
import styles from './login.module.scss'

const loadMsgs = [
    "Fetching your profile...",
    "Processing your stats...",
    "Finalising...",
    "Taking a little longer than usual..."
]

export const LoadingStatus = () => {
    const [msgID, setMsgID] = useState(0)

    useEffect(() => {
        const intervalID = setTimeout(() => {
            setMsgID((msgID < loadMsgs.length - 1) ? msgID + 1 : msgID)
        }, 3000)
        return () => clearInterval(intervalID)
    }, [msgID])

    return (
        <h4 className={styles.loadingMsg}>{loadMsgs[msgID]}</h4>
    )
}