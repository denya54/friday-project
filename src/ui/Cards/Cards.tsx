import {Navigate} from "react-router-dom";
import React, {ChangeEvent,useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import {TableForCards} from "./TableForCards";
import {ModalWindow} from "../Modal/ModalWindow";
import {CardReducerStateType, changePageCount, createCardTC, getCards, setCardsPage, setSortCards} from "../../bll/cardReducer";
import { Paginator } from "../features/paginator/Paginator";
import { SelectPageSize } from "../features/selectPageSize/SelectPageSize";
import { Search } from "../features/search/Search";

export const Cards = React.memo(() => {
//модалки
    const [modalActive, setModalActive] = useState(false)
    const changeModalActive = (isSee: boolean) => setModalActive(isSee)
    const [questionField, setQuestionField] = useState('')
    const changeQuestionField = (e: ChangeEvent<HTMLTextAreaElement>) => setQuestionField(e.currentTarget.value)
    const [answerField, setAnswerField] = useState('')
    const changeAnswerField = (e: ChangeEvent<HTMLTextAreaElement>) => setAnswerField(e.currentTarget.value)

    const [modalRequestActive, setModalRequestActive] = useState(false)
    const changeModalRequestActive = (isSee: boolean) => setModalRequestActive(isSee)
  //

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const requestStatus = useSelector<AppRootStateType, null | string>(state => state.cards.requestStatus)

    const {page, pageCount, cardsTotalCount, sortCards} = useSelector<AppRootStateType, CardReducerStateType>(state=>state.cards)
    const dispatch = useDispatch()

    const seeWindowForCreateNewCard = () => {
        setModalActive(true)
    }

    const createNewCard = () => {
        dispatch(createCardTC(questionField, answerField))
        setModalActive(false)
        setTimeout(()=>setModalRequestActive(true), 500)
        setTimeout(()=>setModalRequestActive(false), 3000)
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
            <ModalWindow active={modalActive} setActive={changeModalActive}>
                Введите данные для новой карточки
                <p>Вопрос</p>
                <textarea value={questionField} onChange={changeQuestionField}/>
                <p>Ответ</p>
                <textarea value={answerField} onChange={changeAnswerField}/>
                <div>
                    <button onClick={createNewCard}>Создать новую карточку</button>
                </div>
            </ModalWindow>

            <div>
                <MainButton onClick={seeWindowForCreateNewCard}>Создать карту</MainButton>
            </div>

            <TableForCards onSortCards={onSortCards}/>
            <ModalWindow active={modalRequestActive} setActive={changeModalRequestActive}>
                {requestStatus}
            </ModalWindow>
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