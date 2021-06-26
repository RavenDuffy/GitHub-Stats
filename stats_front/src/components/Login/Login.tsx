import React from 'react'
import styles from './login.module.scss'
import * as config from '../../config.local.json'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin } from '../../actions/loginActions'
import { LoadingStatus } from './LoadingStatus'


export const Login = () => {
    const dispatch = useDispatch()
    const loginStatus = useSelector((state: any) => state.loginReducer)

    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault()
        dispatch(doLogin())
        const baseURL = 'https://github.com/login/oauth/authorize?'
        window.location.href = `${baseURL}scope=${config.client.scopes.join('%20')}&client_id=${config.client.id}`
    }

    useEffect(() => {
        if (loginStatus.complete)
            document.cookie = `is_logged_in=${loginStatus.complete}; max-age=${60 * 60 * 1};`
    }, [loginStatus])

    return (
        <div className={styles.loginWrapper}>
            {(!loginStatus.complete && !document.cookie.split(';').find(c => c.trim().startsWith('is_logged_in'))?.endsWith('true'))
                ? <button onClick={handleLogin}>Login</button>
                : <div className={styles.loaderWrapper}>
                    <div className={styles.loader}>
                        <div className={styles.loaderFirst}></div><div className={styles.loaderSecond}></div>
                    </div>
                    <LoadingStatus />
                </div>
            }
        </div>
    )
}