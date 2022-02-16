import {instance} from "./instance";


export const packsAPI = {
    getPacks(payload?: PacksGetParams) {
        return instance.get<PacksResponseType>('/cards/pack', {params: payload})
    },
};

// Types
export type PacksGetParams = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string | null
}

export type PacksResponseType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardPacksType = {
    _id: string
    user_id: string
    cardsCount: number
    created: string
    name: string
    private: boolean
    updated: string
}
