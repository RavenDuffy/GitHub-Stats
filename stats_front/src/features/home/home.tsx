import * as config from '../../config.local.json'
import { useDispatch, useSelector } from 'react-redux'
import { FetchStats } from '../../actions/statsActions'
import { useEffect } from 'react'

export const Home = () => {
    const dispatch = useDispatch()
    const stats = useSelector((state:any) => state.statsReducer.user);

    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault()
        const baseURL = 'https://github.com/login/oauth/authorize?'
        window.location.href = `${baseURL}scope=${config.client.scopes.join('%20')}&client_id=${config.client.id}`
    }

    useEffect(() => {
        dispatch(FetchStats())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <button onClick={handleLogin}>
                Login to Github
            </button>

            <button onClick={() => console.log(stats)}>
                Print Stats
            </button>

            {(stats !== undefined) 
                ? <>
                    <h4>{stats.username}</h4>
                    <img src={stats.avatar} alt="avatar" />
                    {stats.stats.mostUsedLangs.map((el:any) => {
                        return <h5 key={el.name}>{el.name} {el.usageNum}</h5>
                    })}
                  </>
                : <h4>Loading...</h4>
            }
        </>
    )
}