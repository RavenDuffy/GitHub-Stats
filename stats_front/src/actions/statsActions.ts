import axios from "axios"
import * as config from "../config.local.json"


export const FetchStats = () => {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: "FETCHING_STATS"
        })

        const stats = await axios.get(config.hosts.stats_endpoint, {
            withCredentials: true
        }).catch(error => {
            console.error(error.response)
        })

        dispatch({
            type: "FETCHED_STATS",
            payload: stats
        })
    }
}