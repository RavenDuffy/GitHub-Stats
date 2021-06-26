import axios from 'axios'
import * as config from '../config.local.json'
import { FETCH_STATS } from '../reducers/statsReducer'

export const fetchStats = () => {
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
        })
        .catch(error => {
            dispatch({
                type: FETCH_STATS.FAILURE,
                payload: error
            })
        })
    }
}