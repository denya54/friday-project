import {CardPacksType, packsAPI, PacksResponseType} from "../dal/packsAPI";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType, AppThunkType} from "./store";

export const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    page: 1,
    pageCount: 10,
    cardsValuesFromRange: [0, 1000],
    sortPacks: '',
    searchField: '',
    myId: null as string | null
}

export type PackActionType = ReturnType<typeof setSearchField> | ReturnType<typeof setPage> | ReturnType<typeof setSort> | ReturnType<typeof setPacks>
    | ReturnType<typeof setCardsCount> | ReturnType<typeof setPageCount> | ReturnType<typeof setPacksMyId>

export type PackReducerStateType = typeof initialState

export const packReducer = (state: PackReducerStateType = initialState, action: PackActionType): PackReducerStateType => {
    switch (action.type) {
        case "packs/SET-PACKS":
            return {...state, ...action.payload}
        case "packs/SET-PAGE":
            return {...state, ...action.payload}
        case "packs/SET-SEARCH-PACK":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setPacks = (payload: PacksResponseType) => {
    return {type: 'packs/SET-PACKS', payload} as const
}
export const setSearchField = (searchField: string) => {
    return {type: 'packs/SET-SEARCH-PACK', payload: {searchField}} as const
}
export const setCardsCount = (cardsCount: number) => {
    return {type: 'SET-CARDS-COUNT', cardsCount} as const
}
export const setPageCount = (pageCount: number) => {
    return {type: 'SET-PAGE-COUNT', pageCount} as const
}
export const setPage = (page: number) => {
    return {type: 'packs/SET-PAGE', payload: {page}} as const
}
export const setSort = (sortPacks: string) => {
    return {type: 'SET-SORT', sortPacks} as const
}
export const setPacksMyId = (myId: string | null) => ({
    type: 'packs/SET_MY_ID',
    payload: {myId}
}) as const

export const getPacks = (): AppThunkType =>
    async (dispatch, getState) => {
        const packs = getState().packs
        try {
            const res = await packsAPI.getPacks({
                page: packs.page,
                pageCount: packs.pageCount,
                min: packs.cardsValuesFromRange[0],
                max: packs.cardsValuesFromRange[1],
                user_id: packs.myId,
                sortPacks: packs.sortPacks,
                packName: packs.searchField
            })
            // @ts-ignore
            dispatch(setPacks(res.data))
        } catch (error: any) {
            const err = error.response ? error.response.data.error : error.message
        }
    }

