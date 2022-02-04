import {combineReducers, createStore} from "redux";
import {registerReducer} from "./register-reduser";

const rootReducer = combineReducers({
    register: registerReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;