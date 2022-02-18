import { useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {CardPacksType} from "../../dal/packsAPI";
import s from "./TableForPacks.module.css";
import {SortButton} from "../features/sort/SortButton";
import React from "react";


export const TableForPacks = (props: {onSortPacks?: (value: string) => void}) => {

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)
    return (

        packs
            ? <div className={s.table}>
                <div className={s.table__row}>
                    <TableCell item={'Name'}/>
                    <TableCell item={'Cards'}/>
                    <TableCell item={'Last Updated'} onSortPacks={props.onSortPacks}/>
                    <TableCell item={'Created'}/>
                </div>
                {packs.map((pack, idx) => <TableRow key={idx} pack={pack}/>)}
            </div>
            : <div>loading...</div>
    )
}
// table-row

const TableRow = (props: {pack: CardPacksType}) => {

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

const TableCell = (props: { item?: string | number, onSortPacks?: (value: string) => void, packID?: string }) => {
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

