import { LOGIN } from "../reducers/loginReducer"

export const doLogin = () => {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: LOGIN.REQUEST,
        })
        // add checks here for loading
        dispatch({
            type: LOGIN.SUCCESS,
            payload: { login_completed: true }
        })
        // add error based on checks
    }
}