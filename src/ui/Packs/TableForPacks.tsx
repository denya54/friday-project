import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {CardPacksType, packsAPI} from "../../dal/packsAPI";
import s from "./TableForPacks.module.css";
import {SortButton} from "../features/sort/SortButton";
import React from "react";
import {deletePackTC, getPacks, updatePackTC} from "../../bll/packReducer";


export const TableForPacks = (props: {onSortPacks?: (value: string) => void}) => {

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)
    return (

        packs
            ? <div className={s.table}>
                <div className={s.table__row}>
                    <TableCell item={'Name'}/>
                    <TableCell item={'Cards'}/>
                    <TableCell item={'Last Updated'} onSortPacks={props.onSortPacks}/>
                    <TableCell item={'Created By'}/>
                    <TableCell item={'Actions'}/>
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
            <TableCell item={props.pack.user_name}/>
            <TableCell1 packID={props.pack._id}/>
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

const TableCell1 = (props: { packID: string}) => {

    const dispatch = useDispatch()

    const updatePack = (packID: string) => {
        dispatch(updatePackTC(packID))
        // packsAPI.updatePack('My third Pack', packID)
        // dispatch(getPacks())
    }

    const deletePack = (packID: string)  => {
        dispatch(deletePackTC(packID))
        // packsAPI.deletePack(packID)
        // dispatch(getPacks())
    }


    return (
        <div className={s.table__cell}>
            <button onClick={()=> updatePack(props.packID)}>update</button>
            <button onClick={()=> deletePack(props.packID)}>delete</button>
        </div>
    )
}

