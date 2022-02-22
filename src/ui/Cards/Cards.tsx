import {Navigate} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import {cardsAPI} from "../../dal/cardsAPI";
import {TableForCards} from "./TableForCards";
import {CardReducerStateType, changePageCount, createCardTC, getCards, setCardsPage, setSortCards} from "../../bll/cardReducer";
import { Paginator } from "../features/paginator/Paginator";
import { SelectPageSize } from "../features/selectPageSize/SelectPageSize";
import { Search } from "../features/search/Search";

export const Cards = React.memo(() => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const {page, pageCount, cardsTotalCount, sortCards} = useSelector<AppRootStateType, CardReducerStateType>(state=>state.cards)
    const dispatch = useDispatch()

    const createNewCard = () => {
        dispatch(createCardTC())
    }
    const onSortCards = useCallback((value: string) => {
        dispatch(setSortCards(value))
    }, [dispatch])
    const onPageChanged = useCallback((page: number) => {
        dispatch(setCardsPage(page))
    }, [dispatch])
    const setPageSize = useCallback((pageCount: number) => {
        dispatch(changePageCount(pageCount))
    }, [dispatch])

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch, sortCards, page, pageCount])

    if (!isLogged) {
        return <Navigate to="/login"/>
    }


    return (
        <div>
            Карты
            <div>
                <MainButton onClick={createNewCard}>Создать карту</MainButton>
            </div>
            <TableForCards onSortCards={onSortCards}/>
            <Paginator totalCount={cardsTotalCount}
                       pageCount={pageCount}
                       onPageChanged={onPageChanged}
                       currentPage={page}
            />
            <SelectPageSize  selectedPageSize={pageCount}
                             pageSizes={[5, 10, 15]}
                             changePageSize={setPageSize}
            />
        </div>

    )
})