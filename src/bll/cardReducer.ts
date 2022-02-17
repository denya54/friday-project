import {CardPacksType, packsAPI, PacksResponseType} from "../dal/packsAPI";
import {AppThunkType} from "./store";
import {cardsAPI, CardsResponseType, CardType} from "../dal/cardsAPI";
import {setPacks} from "./packReducer";


export const initialStateCard = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: ''
}

export type CardActionType =
    ReturnType<typeof setCards>

    // | ReturnType<typeof setSearchField>
    // | ReturnType<typeof setPage>
    // | ReturnType<typeof setSortPacks>
    // | ReturnType<typeof setCardsCount>
    // | ReturnType<typeof setPageCount>
    // | ReturnType<typeof setPacksFromRange>
    // | ReturnType<typeof setMyPacks>
    // | ReturnType<typeof createPackAC>

export type CardReducerStateType = typeof initialStateCard

export const cardReducer = (state: CardReducerStateType = initialStateCard, action: CardActionType): CardReducerStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
        // case "packs/SET-PAGE":
        // case "packs/SET-SEARCH-PACK":
        // case "packs/SET-PAGE-COUNT":
        // case "packs/SET-SORT":
        // case "packs/SET-PACKS-FROM-RANGE":
        // case "packs/SET-MY-PACKS":
        // case "packs/CREATE-PACK":
            return {...state, ...action.payload}

        default:
            return state
    }
}

export const setCards = (payload: CardsResponseType) => {
    return {type: "cards/SET-CARDS", payload} as const
}
// export const setSearchField = (searchField: string) => {
//     return {type: "packs/SET-SEARCH-PACK", payload: {searchField}} as const
// }
// export const setCardsCount = (cardsCount: number) => {
//     return {type: "packs/SET-CARDS-COUNT", payload: {cardsCount}} as const
// }
// export const setPageCount = (pageCount: number) => {
//     return {type: "packs/SET-PAGE-COUNT", payload: {pageCount}} as const
// }
// export const setPage = (page: number) => {
//     return {type: "packs/SET-PAGE", payload: {page}} as const
// }
// export const setSortPacks = (sortPacks: string) => {
//     return {type: 'packs/SET-SORT', payload: {sortPacks}} as const
// }
// export const setPacksFromRange = (cardsValuesFromRange: number[]) => {
//     return {type: "packs/SET-PACKS-FROM-RANGE", payload: {cardsValuesFromRange}}
// }
// export const setMyPacks = (myId: string) => {
//     return {type: "packs/SET-MY-PACKS", payload: {myId}}
// }
//
// export const createPackAC = (namePack: string) => {
//     return {type: "packs/CREATE-PACK", payload: {namePack}} as const
// }


// export const getCards = (): AppThunkType =>
//     async (dispatch, getState) => {
//         const cards = getState().cards
//         try {
//             // const res1 = await cardsAPI.getPacks({
//             //     page: packs.page,
//             //     pageCount: packs.pageCount,
//             //     min: packs.cardsValuesFromRange[0],
//             //     max: packs.cardsValuesFromRange[1],
//             //     user_id: packs.myId,
//             //     sortPacks: packs.sortPacks,
//             //     packName: packs.searchField
//             // })
//
//             const res = await packsAPI.getPacks({
//                 page: packs.page,
//                 pageCount: packs.pageCount,
//                 min: packs.cardsValuesFromRange[0],
//                 max: packs.cardsValuesFromRange[1],
//                 user_id: packs.myId,
//                 sortPacks: packs.sortPacks,
//                 packName: packs.searchField
//             })
//             dispatch(setPacks(res.data))
//         } catch (error: any) {
//             console.log(error)
//         }
//     }

