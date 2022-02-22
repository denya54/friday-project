import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import s from "./TableForCards.module.css";
import React from "react";
import { CardType} from "../../dal/cardsAPI";
import {deleteCardTC, updateCardTC} from "../../bll/cardReducer";
import { SortButton } from "../features/sort/SortButton";


export const TableForCards = (props: {onSortCards?: (value: string) => void}) => {

    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    return (

        cards
            ? <div className={s.table}>
                <div className={s.table__row}>
                    <TableHead item={'Вопрос'}/>
                    <TableHead item={'Ответ'}/>
                    <TableHead item={'Последнее изменение'} onSortCards={props.onSortCards} value={"updated"}/>
                    <TableHead item={'Оценка'} onSortCards={props.onSortCards} value={"grade"}/>
                    <TableHead item={'Действия'}/>

                </div>
                {cards.map((card, idx) => <TableRow key={idx} card={card}/>)}
            </div>
            : <div>loading...</div>
    )
}

//table-head
const TableHead = (props: { item: string | number,  onSortCards?: (value: string) => void , value?: string}) => {
    return (
        <div className={s.table__cell}>
           <span>{props.item}
               {props.onSortCards && props.value ? <SortButton  value={props.value}
                                                                sortItems={props.onSortCards}/> : ''}
           </span>
        </div>
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
            <TableCell1 cardID={props.card._id}/>
        </div>
    )
};

// table-cell

const TableCell = (props: { item: string | number, onSortPacks?: (value: string) => void }) => {
    return (
        <div className={s.table__cell}>
            <span>{props.item}</span>
        </div>
    )
}

const TableCell1 = (props:{ cardID: string}) => {

    const dispatch = useDispatch()

    const updateCard = (cardID: string) => {
        dispatch(updateCardTC(cardID))
    }
    const deleteCard = (cardID: string)  => {
        dispatch(deleteCardTC(cardID))
    }

    return (
        <div className={s.table__cell}>
            <button onClick={()=> updateCard(props.cardID)}>update</button>
            <button onClick={()=> deleteCard(props.cardID)}>delete</button>
        </div>
    )
}