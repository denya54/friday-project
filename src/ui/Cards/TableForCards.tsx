import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import s from "./TableForCards.module.css";
import React, {ChangeEvent, useState} from "react";
import { CardType} from "../../dal/cardsAPI";
import {deleteCardTC, updateCardTC} from "../../bll/cardReducer";
import {ModalWindow} from "../Modal/ModalWindow";


export const TableForCards = () => {

    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    return (

        cards
            ? <div className={s.table}>
                <div className={s.table__row}>
                    <TableCell item={'Вопрос'}/>
                    <TableCell item={'Ответ'}/>
                    <TableCell item={'Last Updated'}/>
                    <TableCell item={'Оценка'}/>
                    <TableCell item={'Действия'}/>

                </div>
                {cards.map((card, idx) => <TableRow key={idx} card={card}/>)}
            </div>
            : <div>loading...</div>
    )
}
// table-row

const TableRow = (props: {card: CardType}) => {

    return (
        <div className={s.table__row}>
            <TableCell item={props.card.question}/>
            <TableCell item={props.card.answer}/>
            <TableCell item={props.card.updated}/>
            <TableCell item={props.card.grade}/>
            <TableCell1 cardID={props.card._id} cardQuestion={props.card.question} cardAnswer={props.card.answer}/>
        </div>
    )
};

// table-cell

const TableCell = (props: { item: string | number, onSortPacks?: (value: string) => void }) => {
    return (
        <div className={s.table__cell}>
            <span>{props.item}</span>
            {/*<input*/}
            {/*    value={props.item}*/}
            {/*    type="text"/>*/}
            {/*{props.onSortPacks ? <SortButton value={"updated"}*/}
            {/*                                 sortItems={props.onSortPacks}/> : ''}*/}
        </div>
    )
}

const TableCell1 = (props:{ cardID: string, cardQuestion: string, cardAnswer: string}) => {

    const [modalActive, setModalActive] = useState(false)
    const changeModalActive = (isSee: boolean) => setModalActive(isSee)
    const [newQuestion, setNewQuestion] = useState(props.cardQuestion)
    const changeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => setNewQuestion(e.currentTarget.value)
    const [newAnswer, setNewAnswer] = useState(props.cardQuestion)
    const changeAnswer = (e: ChangeEvent<HTMLTextAreaElement>) => setNewAnswer(e.currentTarget.value)

    const seeWindowForUpdateCard = () => setModalActive(true)


    const dispatch = useDispatch()

    const updateCard = (cardID: string) => {
        dispatch(updateCardTC(cardID, newQuestion, newAnswer))
        setModalActive(false)
    }
    const deleteCard = (cardID: string)  => {
        dispatch(deleteCardTC(cardID))
    }

    return (
        <div className={s.table__cell}>
            {modalActive && <ModalWindow active={modalActive} setActive={changeModalActive}>
                Введите данные для изменения карточки
                <p>Вопрос</p>
                <textarea value={newQuestion} onChange={changeQuestion}/>
                <p>Ответ</p>
                <textarea value={newAnswer} onChange={changeAnswer}/>
                <div>
                    <button onClick={() => updateCard(props.cardID)}>Изменить карточку</button>
                </div>
            </ModalWindow>}

            <button onClick={seeWindowForUpdateCard}>update</button>
            <button onClick={()=> deleteCard(props.cardID)}>delete</button>
        </div>
    )
}