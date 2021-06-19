import { combineReducers } from 'redux'

import { statsReducer } from '../reducers/statsReducer'
import { validateReducer, newTokenReducer } from '../reducers/tokenReducer'


export const reducers = combineReducers({
    statsReducer,
    validateReducer,
    newTokenReducer
})
