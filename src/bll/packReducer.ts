import {Dispatch} from "redux";
import {loginAPI} from "../dal/loginApi/loginAPI";
import {setIsLoggedInAC} from "./authReducer";

const initialState = {
    searchPack: ""
}

export type AppActionTypes = ReturnType<typeof setSearchPack>
export type PackReducerStateType = typeof initialState

export const packReducer = (state: PackReducerStateType = initialState, action: AppActionTypes): PackReducerStateType => {
    switch (action.type) {
        case "SET-SEARCH-PACK":
            return {...state, searchPack: action.searchPack}
        default:
            return state
    }
}

export const setSearchPack = (searchPack: string) => {
    return {type: 'SET-SEARCH-PACK', searchPack} as const
}


