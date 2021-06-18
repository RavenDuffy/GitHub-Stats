import { Action } from "redux";

export const statsReducer = (state={}, action: Action) => {
    switch(action.type) {
        case "FETCH_STATS": {
            return {...state, fetching: true, fetched: false}
        }
        case "FETCHED_STATS": {
            return {...state, fetching: false, fetched: true}
        }
        default: {
            return state;
        }
    }
}