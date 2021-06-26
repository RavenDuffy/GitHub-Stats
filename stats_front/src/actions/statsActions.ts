import axios from 'axios'
import * as config from '../config.local.json'
import { FETCH_STATS } from '../reducers/statsReducer'

export const fetchStats = () => {
    document.cookie = `stats_ready=${false}; max-age=${60 * 60 * 1};`
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: FETCH_STATS.REQUEST,
        })
        await axios.get(config.hosts.stats_endpoint, {
            withCredentials: true
        }).then(result => {
            dispatch({
                type: FETCH_STATS.SUCCESS,
                payload: result
            })
            document.cookie = `stats_ready=${true}; max-age=${60 * 60 * 1};`
        })
        .catch(error => {
            dispatch({
                type: FETCH_STATS.FAILURE,
                payload: error
            })
        })
    }
}