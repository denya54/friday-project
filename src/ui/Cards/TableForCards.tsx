import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import s from "../Test/Test.module.css";
import {SortButton} from "../features/sort/SortButton";
import React from "react";
import {CardType} from "../../dal/cardsAPI";


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
        </div>
    )
};

// table-cell

const TableCell = (props: { item: string | number, onSortPacks?: (value: string) => void }) => {
    return (
        <div className={s.table__cell}>
            <input
                value={props.item}
                type="text"/>
            {props.onSortPacks ? <SortButton value={"updated"}
                                             sortItems={props.onSortPacks}/> : ''}
        </div>
    )
}