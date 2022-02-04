import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";
import {RegisterAPI} from "./register-api";

export const initialState = {
    error: null as null | string,
    success: false,
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


type ActionsType = ReturnType<typeof setSuccessAC>
    | ReturnType<typeof setErrorAC>

// thunk
export const signUpTC = (email: string, password: string): ThunkType => (
    dispatch) => {
    const data = RegisterAPI.signUp(email, password)
        .then(() => {
            dispatch(setSuccessAC(true));
            console.log("Register is success", data);
        })
        .catch((error) => {
            dispatch(setErrorAC(error))
        })
}

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>


