import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {logoutTC} from '../../bll/authReducer';
import {getPacks, PackReducerStateType, setPacksMyId, setPage, setPageCount} from '../../bll/packReducer';
import {AppRootStateType} from '../../bll/store';
import {Paginator} from '../features/paginator/Paginator';
import {Search} from '../features/search/Search';
import {SortButton} from '../features/sort/SortButton';
import s from "./Test.module.css"
import {CardPacksType} from "../../dal/packsAPI";


export const Test = React.memo(() => {
    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const {
        cardPacks, page, pageCount,
        cardPacksTotalCount, minCardsCount,
        maxCardsCount, cardsValuesFromRange, sortPacks, searchField
    } = useSelector<AppRootStateType, PackReducerStateType>(state => state.packs)

    const onLogout = () => {
        dispatch(logoutTC())
    }
    const onPageChanged = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [dispatch])
    const setPageSize = useCallback((pageCount: number) => {
        dispatch(setPageCount(pageCount))
    }, [dispatch])

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, page, pageCount])

    if (!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            Profile page
            <button onClick={onLogout}>log out</button>
            <Search getSearchData={getPacks}/>
            <PackList/>
            <Paginator totalCount={cardPacksTotalCount}
                       pageCount={pageCount}
                       onPageChanged={onPageChanged}
                       currentPage={page}
                       changePageSize={setPageSize}
                       selectedPageSize={pageCount}
                       pageSizes={[5, 10, 15,20]}
            />
        </div>
    )
})

export const PackList = () => {

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)
    return (

        packs
            ? <div className={s.table}>
                <div>PackList</div>
                <div className={s.table__row}>
                    <TableCell item={'Name'}/>
                    <TableCell item={'Cards'}/>
                    <TableCell item={'Last Updated'} sort/>
                    <TableCell item={'Created By'}/>

                </div>
                {packs.map((pack, idx) => <TableRow key={idx} pack={pack}/>)}
            </div>
            : <div>loading...</div>
    )
}
// table-row

const TableRow = (props: any) => {

    return (
        <div className={s.table__row}>
            <TableCell item={props.pack.name}/>
            <TableCell item={props.pack.cardsCount}/>
            <TableCell item={props.pack.updated}/>
            <TableCell item={props.pack.created}/>
        </div>
    )
};

// table-cell

const TableCell = (props: any) => {
    return (
        <div className={s.table__cell}>
            <input
                value={props.item}
                type="text"/>
            {props.sort ? <SortButton/> : ''}
        </div>
    )
}