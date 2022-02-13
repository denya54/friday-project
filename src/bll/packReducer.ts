import {Dispatch} from "redux";
import {loginAPI} from "../dal/loginApi/loginAPI";
import {setIsLoggedInAC} from "./authReducer";

const initialState = {
    searchPack: "",
    cardPacksTotalCount: 300,
    pageCount: 10,
    page: 1
}

export type AppActionTypes = ReturnType<typeof setSearchPack> | ReturnType<typeof setPage>
export type PackReducerStateType = typeof initialState

export const packReducer = (state: PackReducerStateType = initialState, action: AppActionTypes): PackReducerStateType => {
    switch (action.type) {
        case "SET-SEARCH-PACK":
            return {...state, searchPack: action.searchPack}
        case "SET-PAGE":
            return {...state, page: action.page}
        default:
            return state
    }
}

export const setSearchPack = (searchPack: string) => {
    return {type: 'SET-SEARCH-PACK', searchPack} as const
}
export const setPage = (page: number) => {
    return {type: 'SET-PAGE', page} as const
}


