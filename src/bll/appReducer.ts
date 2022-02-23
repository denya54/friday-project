import {Dispatch} from "redux";
import {setIsLoggedInAC, setUserIDAC} from "./authReducer";
import {loginAPI} from "../dal/loginAPI";

const initialState = {
    isInitialized: false
}

export type AppActionTypes = ReturnType<typeof setInitializedAC> | ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setUserIDAC>
export type AppReducerStateType = typeof initialState

export const appReducer = (state: AppReducerStateType = initialState, action: AppActionTypes): AppReducerStateType => {
    switch (action.type) {
        case "SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setInitializedAC = (isInitialized: boolean) => {
    return {type: 'SET-INITIALIZED', isInitialized} as const
}

export const initializeTC = () => (dispatch: Dispatch<AppActionTypes>) => {
    loginAPI.me()
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserIDAC(res.data._id))
        })
        .finally(() => {
            dispatch(setInitializedAC(true))
        })
}
