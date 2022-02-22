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
                    <TableHead item={'Name'} onSortPacks={props.onSortPacks} value={"name"}/>
                    <TableHead item={'Cards'} onSortPacks={props.onSortPacks} value={"cardsCount"}/>
                    <TableHead item={'Last Updated'} onSortPacks={props.onSortPacks} value={"updated"}/>
                    <TableHead item={'Created By'} onSortPacks={props.onSortPacks} value={"user_name"}/>
                    <TableHead item={'Actions'}/>
                </div>
                {packs.map((pack, idx) => <TableRow key={idx} pack={pack}/>)}
            </div>
            : <div>loading...</div>
    )
}
//table-head
const TableHead = (props: { item: string | number,  onSortPacks?: (value: string) => void , value?: string}) => {
    return (
        <div className={s.table__cell}>
           <span>{props.item}
               {props.onSortPacks && props.value ? <SortButton  value={props.value}
                                                sortItems={props.onSortPacks}/> : ''}
           </span>
        </div>
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
            <TableCell1 name={props.pack.name} packID={props.pack._id} cardCount={props.pack.cardsCount}/>
        </div>
    )
};

// table-cell

const TableCell = (props: { item: string | number, packID?: any, onSortPacks?: (value: string) => void }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let seeCards = (packID: string) => {
        dispatch(changePackIDAC(packID))
        navigate( `/cards/${packID}`)

    }
    return (
       <div className={s.table__cell}>
           <span onClick={()=> seeCards(props.packID)}>{props.item}
               {props.onSortPacks ? <SortButton value={"updated"}
                                                sortItems={props.onSortPacks}/> : ''}
           </span>
            </div>
    )
}

const TableCell1 = (props: { name: string, packID: string, cardCount: number}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updatePack = (packID: string) => {
        dispatch(updatePackTC(packID))
    }

    const deletePack = (packID: string)  => {
        dispatch(deletePackTC(packID))
    }
    const learnPack = (packID: string, name: string) => {
       dispatch(changePackIDAC(packID))
        navigate(`/learn/${packID}/${name}`, {replace: true})
    }

    return (
        <div className={s.table__cell}>
            <div className={s.btnContainer}>
                <div className={s.btn}>
                    <button onClick={() => updatePack(props.packID)}>update</button>
                </div>
                <div className={s.btn}>
                    <button onClick={() => deletePack(props.packID)}>delete</button>
                </div>
                {props.cardCount> 0 &&  <div className={s.btn}>
                    <button className={s.learnBTN} onClick={()=>learnPack(props.packID, props.name)}>LEARN</button>
                </div>}
            </div>
        </div>
    )
}

