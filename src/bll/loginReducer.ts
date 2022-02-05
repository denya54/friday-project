import {loginAPI, LoginParamsType, ResponseDataType} from "../ui/Login/loginApi/loginAPI";
import {Dispatch} from "redux";

const initialState = {
    data: {},
    isLoggedIn: false
}

type initialStateType = typeof initialState
type LoginActionTypes = ReturnType<typeof loginAC> | ReturnType<typeof isLoggedInAC>

export const loginReducer = (state: initialStateType = initialState ,action: LoginActionTypes): initialStateType => {
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
export const isLoggedInAC = (isLoggedIn: boolean) => {return {type: "SET-IS-LOGGED-IN", isLoggedIn} as const}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    loginAPI.login(data)
        .then(res => {
            dispatch(loginAC(res.data.data.data))
            dispatch(isLoggedInAC(true))
        })
        .catch(e => {
            const error = e.response ? alert(e.response.data.error) : (e.message + ', more details in the console')
        })
}