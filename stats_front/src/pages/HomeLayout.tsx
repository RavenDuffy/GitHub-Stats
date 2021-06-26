import { Login } from "../components/Login/Login"
import Socket from "../components/statsSocket"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStats } from "../actions/statsActions"
import { Home } from "../components/Home/Home"
import { useEffect } from "react"


export const HomeLayout = () => {
    const dispatch = useDispatch()

    const [isLoginComplete, setIsLoginComplete] = useState(false)
    const [doStatsExist, setDoStatsExist] = useState(false)
    const recievedStats = useSelector((state: any) => state.statsReducer.userStats)
    
    Socket.onmessage = event => {
        let parsed = event.data
        console.log(parsed)
        try { parsed = JSON.parse(parsed) } catch (e) { }
        if (parsed?.fetched_status !== undefined) {
            setIsLoginComplete(parsed.fetched_status)
            dispatch(fetchStats())
        }
    }

    useEffect(() => {
        if (document.cookie.split(';').find(c => c.trim().startsWith('stats_ready'))?.endsWith('true') && !doStatsExist && isLoginComplete)
            dispatch(fetchStats())
        else if (document.cookie.split(';').find(c => c.trim().startsWith('stats_ready')) === undefined && !doStatsExist && isLoginComplete)
            dispatch(fetchStats())
        if (recievedStats?.username !== undefined)
            setDoStatsExist(true)
    }, [doStatsExist, isLoginComplete, recievedStats])

    return (
        <>
            {(recievedStats?.username === undefined)
                ? <Login />
                : <Home stats={recievedStats}/>
            }
        </>
    )
}