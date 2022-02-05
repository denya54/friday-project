import {applyMiddleware, combineReducers, createStore} from "redux";
import {registerReducer} from "./register-reduser";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    register: registerReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;