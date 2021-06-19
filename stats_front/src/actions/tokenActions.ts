import axios from "axios";
import * as config from '../config.local.json'
import { TOKEN } from "../reducers/tokenReducer";

export const validateToken = () => {
    return async (dispatch: any, getState: any) => {
        dispatch({ 
            type: TOKEN.VALIDATE_REQUEST
        })
        const currentToken = document.cookie.split(';').find(e => e.includes('access_token'))
        await axios.get(`${config.hosts.back}/validate/${currentToken}`)
            .then(isValid => {
                dispatch({
                    type: TOKEN.VALIDATE_SUCCESS,
                    payload: isValid
                })
            })
            .catch(error => {
                dispatch({ 
                    type: TOKEN.VALIDATE_FAILURE,
                    payload: error
                })
            })
    }
}

export const fetchToken = () => {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: TOKEN.FETCH_NEW_REQUEST
        })
        await axios.get(`${config.hosts.back}/update_token`, {
            withCredentials: true
        }).then(newToken => {
            dispatch({
                type: TOKEN.FETCH_NEW_SUCCESS,
                payload: newToken
            })
            dispatch({
                type: TOKEN.VALIDATE_SUCCESS,
                payload: { tokenValid: true }
            })
        })
        .catch(error => {
            dispatch({
                type: TOKEN.FETCH_NEW_FAILURE,
                payload: error
            })
        })
    }
}