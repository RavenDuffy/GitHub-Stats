import { Login } from "../components/Login/Login"
import Socket from "../components/statsSocket"
import { useState } from "react"


export const HomeLayout = () => {
    const [isLoginComplete, setIsLoginComplete] = useState(false)
    
    Socket.onmessage = event => {
        let parsed = event.data
        console.log(parsed)
        try { parsed = JSON.parse(parsed) } catch (e) { }
        if (parsed?.fetched_status !== undefined)
            setIsLoginComplete(parsed.fetched_status)
    }

    return (
        <>
            {(!isLoginComplete)
                ? <Login />
                : <div>Full View</div>
            }
        </>
    )
}