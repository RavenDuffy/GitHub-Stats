import React from 'react'
import * as config from '../../config.local.json'
import axios from 'axios'

export const Home = () => {
    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault()
        const baseURL = 'https://github.com/login/oauth/authorize?'
        window.location.href = `${baseURL}scope=${config.client.scopes.join('%20')}&client_id=${config.client.id}`
    }

    const fetchStats = async (event: React.MouseEvent) => {
        event.preventDefault()
        const stats = await axios.get(config.hosts.stats_endpoint, {
            withCredentials: true
        }).catch(error => {
            console.log(error.response)
        })
        if (stats !== undefined) console.log(stats)
    }

    return (
        <>
            <button onClick={handleLogin}>
                Login to Github
            </button>

            <button onClick={fetchStats}>
                Get Your Stats
            </button>
        </>
    )
}