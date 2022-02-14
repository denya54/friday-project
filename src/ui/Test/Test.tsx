import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logoutTC } from '../../bll/authReducer';
import { getPacks, packType } from '../../bll/packReducer';
import { AppRootStateType } from '../../bll/store';
import { Paginator } from '../../features/paginator/Paginator';
import { Search } from '../../features/search/Search';
import { SortButton } from '../../features/sort/SortButton';
import s from "./Test.module.css"


export const Test = () => {
    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const onLogout = () => {
        dispatch(logoutTC())
    }
    useEffect(() => {
        dispatch(getPacks())
    }, [])

    if(!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            Profile page
            <button onClick={onLogout}>log out</button>
            <Search />
            <PackList />
            <Paginator />
        </div>
    )
}

export const PackList = () => {

    const packs = useSelector<AppRootStateType, Array<packType>>(state => state.packs.cardPacks)

    return (
        packs
            ? <div className={s.table}>
                <div>PackList</div>
                <div className={s.table__row}>
                    <TableCell item={'Name'}/>
                    <TableCell item={'Cards'} />
                    <TableCell item={'Last Updated'} sort/>
                    <TableCell item={'Created By'} />

                </div>
                {packs.map((pack, idx) => <TableRow key={idx} pack={pack} />)}
            </div>
            : <div>loading...</div>
    )
}
// table-row

const TableRow = (props: any) => {

    return (
        <div className={s.table__row}>
            <TableCell item={props.pack.name} />
            <TableCell item={props.pack.cardsCount} />
            <TableCell item={props.pack.updated} />
            <TableCell item={props.pack.created} />
        </div>
    )
};

// table-cell

const TableCell = (props: any) => {
    return (
        <div className={s.table__cell}>
            <input
                value={props.item}
                type="text" />
            {props.sort? <SortButton />: ''}
        </div>
    )
}