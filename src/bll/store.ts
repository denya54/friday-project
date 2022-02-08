import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./authReducer";
import {appReducer} from "./appReducer";
import {RecoveryPasswordReducer} from "./recoveryPasswordReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    login: authReducer,
    app: appReducer,
    password: RecoveryPasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;