import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {RegisterAPI} from "./register-api";
import {AxiosError} from "axios";

export const initialState = {
    error: null as null | string,
    success: false,
    isLoading: false
};
type RegisterStateType = typeof initialState

export const registerReducer = (state: RegisterStateType = initialState, action: ActionsType): RegisterStateType => {
    switch (action.type) {
        case "register/SET_ERROR":
            return {
                ...state, error: action.error
            }
        case "register/SET_SUCCESS":
            return {
                ...state, success: action.success
            }
        case "register/SET_IS_LOADING":
            return {
                ...state, isLoading: action.isLoading
            }
        default:
            return state
    }
}
// actions
export const setErrorAC = (error: string) => ({
    type: "register/SET_ERROR", error
} as const)

export const setSuccessAC = (success: boolean) => ({
    type: "register/SET_SUCCESS", success
} as const)

export const setISLoadingAC = (isLoading: boolean) => ({
    type: "register/SET_IS_LOADING", isLoading
} as const)

type ActionsType = ReturnType<typeof setSuccessAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setISLoadingAC>

// thunk
export const signUpTC = (email: string, password: string, password2: string): ThunkType => (
    dispatch) => {
    if (password !== password2) {
        dispatch(setErrorAC('Passwords don\'t match'))
    } else {
        dispatch(setISLoadingAC(true))
        RegisterAPI.signUp(email, password)
            .then((data) => {
                if (data.error) {
                    dispatch(setErrorAC(data.error))
                } else {
                    dispatch(setSuccessAC(true))
                }
            })
            .catch((error: AxiosError) => {
                const err = error.response ? error.response.data.error: error.message
                dispatch(setErrorAC(err))
            })
            .finally(()=> {
                dispatch(setISLoadingAC(false))
            })
    }
}
export type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>


