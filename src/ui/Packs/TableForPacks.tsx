import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {CardPacksType, packsAPI} from "../../dal/packsAPI";
import s from "./TableForPacks.module.css";
import {SortButton} from "../features/sort/SortButton";
import React from "react";
import {deletePackTC, getPacks, updatePackTC} from "../../bll/packReducer";
import {changePackIDAC} from "../../bll/cardReducer";
import {useNavigate} from "react-router-dom";


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
            <TableCell item={props.pack.name} packID={props.pack._id}/>
            <TableCell item={props.pack.cardsCount} packID={props.pack._id}/>
            <TableCell item={props.pack.updated} packID={props.pack._id}/>
            <TableCell item={props.pack.user_name} packID={props.pack._id}/>
            <TableCell1 packID={props.pack._id}/>
        </div>
    )
};

// table-cell

const TableCell = (props: { item: string | number, packID?: any, onSortPacks?: (value: string) => void }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let seeCards = (packID: string) => {
        dispatch(changePackIDAC(packID))
        navigate( '/cards')

    }
    return (
       <div className={s.table__cell}>
           <span onClick={()=> seeCards(props.packID)}>{props.item}</span>
                {/*<input*/}
                {/*    value={props.item}*/}
                {/*    type="text"/>*/}
                {/*{props.onSortPacks ? <SortButton value={"updated"}*/}
                {/*                                 sortItems={props.onSortPacks}/> : ''}*/}
            </div>
    )
}

const TableCell1 = (props: { packID: string}) => {

    const dispatch = useDispatch()

    const updatePack = (packID: string) => {
        dispatch(updatePackTC(packID))
    }

    const deletePack = (packID: string)  => {
        dispatch(deletePackTC(packID))
    }


    return (
        <div className={s.table__cell}>
            <button onClick={()=> updatePack(props.packID)}>update</button>
            <button onClick={()=> deletePack(props.packID)}>delete</button>
        </div>
    )
}

