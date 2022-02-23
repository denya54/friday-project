import {Navigate} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import {TableForCards} from "./TableForCards";
import {createCardTC, getCards} from "../../bll/cardReducer";
import {ModalWindow} from "../Modal/ModalWindow";

export const Cards = () => {
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

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch])

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
            <TableForCards/>
            <ModalWindow active={modalRequestActive} setActive={changeModalRequestActive}>
                {requestStatus}
            </ModalWindow>

        </div>

    )
}