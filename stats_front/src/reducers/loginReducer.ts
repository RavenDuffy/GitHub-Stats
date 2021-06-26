export enum LOGIN {
    REQUEST = "LOGIN_REQUEST",
    SUCCESS = "LOGIN_SUCCESS",
    FAILURE = "LOGIN_FAILURE"
}

export const loginReducer = (state={}, action: any) => {
    switch(action.type) {
        case LOGIN.REQUEST: {
            return {
                ...state,
                working: true,
                complete: false
            }
        }
        case LOGIN.SUCCESS: {
            return {
                ...state,
                working: false,
                complete: true 
            }
        }
        case LOGIN.FAILURE: {
            return {
                ...state,
                working: false,
                complete: true,
                error: action.payload
            }
        }
        default: {
            return state
        }
    }
}