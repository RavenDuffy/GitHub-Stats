import axios from 'axios'
import { getConfig } from '../config.local'
import { FETCH_STATS } from '../reducers/statsReducer'

const config = getConfig()

export const fetchStats = (gitId: string | null=null) => {
    document.cookie = `stats_ready=${false}; max-age=${60 * 60 * 1};`
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: FETCH_STATS.REQUEST,
        })
        if (gitId !== null && isNaN(parseInt(gitId))) {
            dispatch({
                type: FETCH_STATS.FAILURE,
                payload: { error: 'invalid git_id' }
            })
            return
        }
        await axios.get((gitId !== null) 
            ? `${config.hosts.back}/stats/${parseInt(gitId)}`
            : `${config.hosts.back}/stats`, {
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