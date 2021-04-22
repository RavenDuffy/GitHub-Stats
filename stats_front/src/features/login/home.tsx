import * as config from '../../config.json'

interface Props {
    redirectURL: string
}

export const Home: React.FC<Props> = (props: Props) => {
    const handleLogin = (event: React.MouseEvent) => {
        event.preventDefault()
        // fetch(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${config.client.id}`)
        //     .then(res => res.json())
        //     .then(res => console.log(res.json()))
        window.location.href = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${config.client.id}`
    }

    return (
        <button onClick={handleLogin}>
            Login to Github
        </button>
    )
}