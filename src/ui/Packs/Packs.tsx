import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {
    createPackTC, getPacks, PackReducerStateType, setMyPacks, setPacksFromRange,
    setPage, setPageCount, setSortPacks
} from "../../bll/packReducer";
import {TableForPacks} from "./TableForPacks";
import MainButton from "../../componens/mainButton/MainButton";
import s from "../Login/Login.module.css";
import {loginStateType} from "../../bll/authReducer";
import {Search} from "../features/search/Search";
import {Paginator} from "../features/paginator/Paginator";
import {SelectPageSize} from "../features/selectPageSize/SelectPageSize";
import {debounce} from "lodash";
import {PacksRange} from "../features/packsRange/PacksRange";
import {ModalWindow} from "../Modal/ModalWindow";

export const Packs = React.memo(() => {

    //для модалок
    const [modalActive, setModalActive] = useState(false)
    const changeModalActive = (isSee: boolean) => setModalActive(isSee)
    const [nameNewPack, setNameNewPack] = useState('')
    const changeNewNamePack = (e: ChangeEvent<HTMLInputElement>) => setNameNewPack(e.currentTarget.value)

    const [modalRequestActive, setModalRequestActive] = useState(false)
    const changeModalRequestActive = (isSee: boolean) => setModalRequestActive(isSee)
    //

    const [onlyMy, setOnlyMy] = useState(false)

    const {isLoggedIn, userID} = useSelector<AppRootStateType, loginStateType>(state => state.login)

    const {
        cardPacks, page, pageCount,
        cardPacksTotalCount, minCardsCount,
        maxCardsCount, cardsValuesFromRange, sortPacks, searchField, requestStatus
    } = useSelector<AppRootStateType, PackReducerStateType>(state => state.packs)

    const dispatch = useDispatch()

    const onPageChanged = useCallback((page: number) => {
        dispatch(setPage(page))
    }, [dispatch])
    const setPageSize = useCallback((pageCount: number) => {
        dispatch(setPageCount(pageCount))
    }, [dispatch])
    const onSortPacks = useCallback((value: string) => {
        dispatch(setSortPacks(value))
    }, [dispatch])
    const debouncedRangeData = debounce(values => {
        dispatch(setPacksFromRange(values))
    }, 400)
    const onRangeChanged = useCallback((values) => {
        debouncedRangeData(values)
    }, [dispatch])

    const createNewPack = () => {
        dispatch(createPackTC(nameNewPack))
        setModalActive(false)
        setTimeout(()=>setModalRequestActive(true), 500)
        setTimeout(()=>setModalRequestActive(false), 3000)
    }

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, page, pageCount, sortPacks, maxCardsCount, cardsValuesFromRange])


    const seeWindowForCreateNewPack = () => setModalActive(true)

    const changeMyPacksSee = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.currentTarget.checked === true) {
            setOnlyMy(e.currentTarget.checked)
            dispatch(setMyPacks(userID))
            dispatch(getPacks())
        } else {
            setOnlyMy(e.currentTarget.checked)
            dispatch(setMyPacks(''))
            dispatch(getPacks())
        }
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            Колоды
            <ModalWindow active={modalActive} setActive={changeModalActive}>
                Введите название новой колоды
                <input value={nameNewPack} onChange={changeNewNamePack}/>
                <button onClick={createNewPack}>Создать новую колоду</button>
            </ModalWindow>
            <div>
                Только мои Колоды
                <input className={s.rememberCheckbox} type="checkbox" checked={onlyMy} onChange={changeMyPacksSee}
                />
            </div>
            <PacksRange cardsValuesFromRange={cardsValuesFromRange}
                        minCardsCount={minCardsCount}
                        maxCardsCount={maxCardsCount}
                        handleRangeChange={onRangeChanged}
            />
            <Search getSearchData={getPacks}/>
            <div>
                <MainButton onClick={seeWindowForCreateNewPack}>Создать колоду</MainButton>
            </div>
            <TableForPacks onSortPacks={onSortPacks}/>
            <Paginator totalCount={cardPacksTotalCount}
                       pageCount={pageCount}
                       onPageChanged={onPageChanged}
                       currentPage={page}
            />
            <SelectPageSize selectedPageSize={pageCount}
                            pageSizes={[5, 10, 15, 20]}
                            changePageSize={setPageSize}
            />
            <ModalWindow active={modalRequestActive} setActive={changeModalRequestActive}>
                {requestStatus}
            </ModalWindow>

        </div>
    )
})