import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getUserDataTC} from "../../bll/authReducer";
import {getPacks} from "../../bll/packReducer";
import {CardPacksType, packsAPI} from "../../dal/packsAPI";
import {Table} from "./Table";
import MainButton from "../../componens/mainButton/MainButton";

export const Packs = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userName = useSelector<AppRootStateType, string>(state => state.login.name)

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserDataTC())
    }, [])

    useEffect(() => {
        dispatch(getPacks())
    }, [])

    const createNewPack = () => {
        packsAPI.createPack('my first PACK')
        dispatch(getPacks())
    }


    if (!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            <h3>Вы вошли как {userName}</h3>
            Колоды
            <div>
                <MainButton onClick={createNewPack}>Создать колоду</MainButton>
            </div>

            <Table
                // packs={packs}
            />
        </div>
    )
}

// type TablePropsType = {
//     packs?: Array<CardPacksType>
// }
//
// const Table = (props: TablePropsType) => {
//     return (
//         props.packs
//             ?
//             <div>
//                 <TableCell item={'Name'}/>
//                 <TableCell item={'Cards'}/>
//                 <TableCell item={'Last Updated'}/>
//                 <TableCell item={'Created By'}/>
//         <div>
//             {props.packs.map((pack, idx) => <TableRow key={idx} pack={pack} />)}
//         </div>
//             </div>
//             : <div>Нет паков</div>
//     )
// }
//
// type TableRowPropsType = {
//     pack: CardPacksType
// }
//
// const TableRow = (props: TableRowPropsType) => {
//
//     return (
//         <div className="table__row">
//             <TableCell item={props.pack.name} />
//             <TableCell item={props.pack.cardsCount} />
//             <TableCell item={props.pack.updated} />
//             <TableCell item={props.pack.created} />
//         </div>
//     )
// };
//
// type TableCellPropsType = {
//     item: string | number
// }
//
// const TableCell = (props: TableCellPropsType) => {
//
//     // const [state, setState] = useState(item);
//
//     return (
//         <div>
//             <input
//                 value={props.item}
//                 // onChange={({ target }) => setState(target.value)}
//                 type="text" />
//         </div>
//     )
// }