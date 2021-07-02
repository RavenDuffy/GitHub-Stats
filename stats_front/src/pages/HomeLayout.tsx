import { Login } from "../components/Login/Login"
import Socket from "../components/statsSocket"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStats } from "../actions/statsActions"
import { Home } from "../components/Home/Home"
import { useEffect } from "react"
import { LoginError } from "../components/Login/LoginError"


export const HomeLayout = () => {
    const dispatch = useDispatch()

    const [isLoginComplete, setIsLoginComplete] = useState(false)
    const [doStatsExist, setDoStatsExist] = useState(false)
    const recievedStats = useSelector((state: any) => state.statsReducer.userStats)
    const recievedError = useSelector((state: any) => state.statsReducer.error)
    
    Socket.onmessage = event => {
        let parsed = event.data
        try { parsed = JSON.parse(parsed) } catch (e) { }
        if (parsed?.fetched_status !== undefined) {
            setIsLoginComplete(parsed.fetched_status)
            dispatch(fetchStats())
        }
    }

    if (document.cookie.split(';').find(c => c.trim().startsWith('is_logged_in'))?.endsWith('true') && !isLoginComplete)
        setIsLoginComplete(true)

    useEffect(() => {
        if (document.cookie.split(';').find(c => c.trim().startsWith('stats_ready'))?.endsWith('true') && !doStatsExist && isLoginComplete)
            dispatch(fetchStats())
        else if (document.cookie.split(';').find(c => c.trim().startsWith('stats_ready')) === undefined && !doStatsExist && isLoginComplete)
            dispatch(fetchStats())
        if (recievedStats?.username !== undefined)
            setDoStatsExist(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doStatsExist, isLoginComplete, recievedStats, recievedError])

    if (recievedError !== undefined)
        return <LoginError />
    else if (recievedStats?.stats === undefined)
        return <Login />
    else
        return <Home stats={recievedStats} />
}