import * as config from '../../config.local.json'

export const Home = () => {
    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault()
        const baseURL = 'https://github.com/login/oauth/authorize?'
        window.location.href = `${baseURL}scope=${config.client.scopes.join('%20')}&client_id=${config.client.id}`
    }

    return (
        <button onClick={handleLogin}>
            Login to Github
        </button>
    )
}