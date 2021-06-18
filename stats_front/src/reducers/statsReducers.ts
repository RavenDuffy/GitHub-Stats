export const statsReducer = (state={}, action: any) => {
    switch(action.type) {
        case "FETCH_STATS": {
            return {...state, fetching: true, fetched: false}
        }
        case "FETCHED_STATS": {
            return {...state, fetching: false, fetched: true, user: action.payload.data}
        }
        default: {
            return state;
        }
    }
}