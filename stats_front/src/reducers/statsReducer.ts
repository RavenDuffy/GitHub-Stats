export enum FETCH_STATS {
    REQUEST = "FETCH_STATS_REQUEST",
    SUCCESS = "FETCH_STATS_SUCCESS",
    FAILURE = "FETCH_STATS_FAILURE"
}

export const statsReducer = (state={}, action: any) => {
    switch(action.type) {
        case FETCH_STATS.REQUEST: {
            return {
                ...state, 
                fetching: true, 
                fetched: false
            }
        }
        case FETCH_STATS.SUCCESS: {
            return {
                ...state, 
                fetching: false,
                fetched: true, 
                user: action.payload.data
            }
        }
        case FETCH_STATS.FAILURE: {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                error: action.payload.data, 
                user: {}
            }
        }
        default: {
            return state;
        }
    }
}