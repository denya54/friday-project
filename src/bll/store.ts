import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./authReducer";
import thunk from "redux-thunk";
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
    login: authReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;