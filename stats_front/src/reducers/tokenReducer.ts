export enum TOKEN {
    VALIDATE_REQUEST = "VALIDATE_TOKEN_REQUEST",
    VALIDATE_SUCCESS = "VALIDATE_TOKEN_SUCCESS",
    VALIDATE_FAILURE = "VALIDATE_TOKEN_FAILURE",
    FETCH_NEW_SUCCESS = "NEW_TOKEN_SUCCESS",
    FETCH_NEW_REQUEST = "NEW_TOKEN_REQUEST",
    FETCH_NEW_FAILURE = "NEW_TOKEN_FAILURE"
}

export const validateReducer = (state={}, action: any) => {
    switch (action.type) {
        case TOKEN.VALIDATE_REQUEST: {
            return {
                ...state, 
                fetching: true, 
                fetched: false
            }
        }
        case TOKEN.VALIDATE_SUCCESS: {
            return {
                ...state, 
                fetching: false,
                fetched: true, 
                tokenValid: action.payload.data
            }
        }
        case TOKEN.VALIDATE_FAILURE: {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                error: action.payload.data, 
                tokenValid: {}
            }
        }
        default: {
            return state
        }
    }
}

export const newTokenReducer = (state={}, action: any) => {
    switch (action.type) {
        case TOKEN.FETCH_NEW_REQUEST: {
            return {
                ...state, 
                fetching: true, 
                fetched: false
            }
        }
        case TOKEN.FETCH_NEW_SUCCESS: {
            return {
                ...state, 
                fetching: false,
                fetched: true, 
                newToken: action.payload.data
            }
        }
        case TOKEN.FETCH_NEW_FAILURE: {
            return {
                ...state, 
                fetching: false, 
                fetched: true, 
                error: action.payload.data, 
                newToken: {}
            }
        }
        default: {
            return state
        }
    }
}