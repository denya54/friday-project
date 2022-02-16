import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getUserDataTC} from "../../bll/authReducer";
import {getPacks} from "../../bll/packReducer";
import {CardPacksType} from "../../dal/packsAPI";

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

    if (!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            <h3>Вы вошли как {userName}</h3>

            {packs.map(p => <div>{p.name}</div>)}
            Packs
        </div>
    )
}