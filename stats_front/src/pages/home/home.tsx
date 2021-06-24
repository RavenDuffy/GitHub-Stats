import * as config from '../../config.local.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStats } from '../../actions/statsActions'
import { validateToken, fetchToken } from '../../actions/tokenActions'
import { socket } from './tokenSocket'
import { InfoLayout } from '../../components/info/info'
import { useEffect } from 'react'
import styles from './home.module.scss'

socket.onopen = () => {
    socket.send("open")
}
socket.onmessage = event => {
    let parsed = event.data
    try { parsed = JSON.parse(parsed) } catch (e) {}
    if (parsed.accessToken !== undefined)
        document.cookie = `access_token=${parsed.accessToken}`
}

export const HomeLayout = () => {
    const dispatch = useDispatch()
    const stats = useSelector((state:any) => state.statsReducer.user)
    const error = useSelector((state:any) => state.statsReducer.error)
    const isValidToken = useSelector((state:any) => state.validateReducer.tokenValid)

    const handleLogin = (event: React.MouseEvent | undefined = undefined) => {
        event?.preventDefault()
        const baseURL = 'https://github.com/login/oauth/authorize?'
        window.location.href = `${baseURL}scope=${config.client.scopes.join('%20')}&client_id=${config.client.id}`
    }

    useEffect(() => {
        const cookiesList = document.cookie.split(';').map(e => e.trim())
        if (cookiesList.filter(e => e.includes('git_id=') || e.includes('access_token=')).length >= 2) {
            if (isValidToken !== undefined && isValidToken.tokenValid)
                dispatch(fetchStats())
            else if (isValidToken === undefined)
                dispatch(validateToken())
            else if (!isValidToken.tokenValid)
                dispatch(fetchToken())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValidToken])

    if (isValidToken === undefined) return (
        <div className={styles.loginWrapper}>
            <div className={styles.dataUsage}>
                <h4>How we're using your data</h4>
                <p>We collect:</p>
                <ul>
                    <li>Your username</li>
                    <li>Your avatar's url</li>
                    <li>The number of repositories you've contributed to (public and private)</li>
                    <li>The number of commits you've made to those repositories</li>
                    <li>The amount of each language used in the repositories (measure in bytes)</li>
                </ul>
                <p>We use this information to create an infographic to display the aforementioned stats.</p>
                <p>If you're okay with all of that, please login!</p>
            </div>
            <button onClick={handleLogin}>
                Login to Github
            </button>
        </div>
    )
    else if (stats === undefined || (Object.keys(stats).length === 0 && stats.constructor === Object)) {
        return <h4>Loading...</h4>
    }
    else if (isValidToken.tokenValid) {
        return (
            <div className={styles.homeWrapper}>
                {(document.cookie.includes('access_token') && stats !== undefined) 
                    ? <InfoLayout userInfo={stats}/>
                    : <h4>{(error === undefined) 
                        ? "Loading..." 
                        : "Error occured. Please try logging in again."
                    }</h4>
                }
                <button onClick={handleLogin}>
                    {(document.cookie.includes('access_token') && stats !== undefined) ? "Refresh Stats" : "Login"}
                </button>
            </div>
        )
    }
    else { return <h4>Error. Please delete your cookies and refresh.</h4> }
}