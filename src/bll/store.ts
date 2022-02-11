import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./authReducer";
import {appReducer} from "./appReducer";
import {RecoveryPasswordReducer} from "./recoveryPasswordReducer";
import {registerReducer} from "./registerReduser";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    login: authReducer,
    app: appReducer,
    password: RecoveryPasswordReducer,
    register: registerReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;