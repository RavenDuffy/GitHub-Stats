import { combineReducers } from "redux";

// import reducers here
import { statsReducer } from "./reducers/statsReducer";
import { loginReducer } from "./reducers/loginReducer";

export const reducers = combineReducers({
    // place reducers here for combination
    statsReducer,
    loginReducer,
})