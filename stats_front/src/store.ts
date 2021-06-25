import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { reducers } from './reducers'

const middleware = applyMiddleware(logger, thunk)

export const store = createStore(reducers, middleware)