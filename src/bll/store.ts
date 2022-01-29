import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers({

})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;