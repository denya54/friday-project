import {loginAPI, LoginParamsType, ResponseDataType} from "../ui/Login/loginApi/loginAPI";
import {Dispatch} from "redux";

const initialState = {
    data: {},
    isLoggedIn: false
}

type loginInitialStateType = typeof initialState
type LoginActionTypes = ReturnType<typeof loginAC> | ReturnType<typeof setIsLoggedInAC>

export const authReducer = (state: loginInitialStateType = initialState , action: LoginActionTypes): loginInitialStateType => {
    switch(action.type) {
        case "LOGIN":
            return {...state, data: action.data}
        case "SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export const loginAC = (data: ResponseDataType) => {return {type: "LOGIN", data} as const}
export const setIsLoggedInAC = (isLoggedIn: boolean) => {return {type: "SET-IS-LOGGED-IN", isLoggedIn} as const}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    loginAPI.login(data)
        .then(res => {
            if(res.data) {
                dispatch(loginAC(res.data))
                dispatch(setIsLoggedInAC(true))
            }
        })
        .catch(e => {
            const error = e.response ? alert(e.response.data.error) : (e.message + ', more details in the console')
        })
}