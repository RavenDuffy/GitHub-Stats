import * as config from '../../config.local.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStats } from '../../actions/statsActions'
import { validateToken, fetchToken } from '../../actions/tokenActions'
import { useEffect } from 'react'

export const Home = () => {
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
        <button onClick={handleLogin}>
            Login to Github
        </button>
    )
    else if (stats === undefined || (Object.keys(stats).length === 0 && stats.constructor === Object)) {
        return <h4>Loading...</h4>
    }
    else if (isValidToken.tokenValid) {
        return (
            <>
                <button onClick={handleLogin}>
                    Login to Github
                </button>

                <button onClick={() => console.log(stats)}>
                    Check stats
                </button>

                <button onClick={() => dispatch(validateToken())}>
                    Validate token
                </button>

                {(document.cookie.includes('access_token') && stats !== undefined) 
                    ? <>
                        <h4>{stats.username}</h4>
                        <img src={stats.avatar} alt="avatar" />
                        {stats.stats.mostUsedLangs.map((el:any) => {
                            return <h5 key={el.name}>{el.name} {el.usageNum}</h5>
                        })}
                    </>
                    : <h4>{(error === undefined) 
                        ? "Loading..." 
                        : "Error occured. Please try logging in again."
                    }</h4>
                }
            </>
        )
    }
    else { return <h4>Error. Please delete your cookies and refresh.</h4> }
}