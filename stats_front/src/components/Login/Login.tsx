import React from 'react'
import styles from './login.module.scss'
import * as config from '../../config.local.json'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin } from '../../actions/loginActions'


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
        // empty for now
    }, [loginStatus])
    console.log(loginStatus)

    return (
        <div className={styles.loginWrapper}>
            {(!loginStatus.complete)
                ? <button onClick={handleLogin}>Login</button>
                : <div className={styles.loader}></div>
            }
        </div>
    )
}