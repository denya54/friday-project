import {applyMiddleware, combineReducers, createStore} from "redux";
import {RecoveryPasswordReducer} from "./recoveryPasswordReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    password: RecoveryPasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;