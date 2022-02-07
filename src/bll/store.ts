import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./authReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    login: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;