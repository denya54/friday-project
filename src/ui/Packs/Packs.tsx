import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {createPackTC, getPacks} from "../../bll/packReducer";
import {CardPacksType, packsAPI} from "../../dal/packsAPI";
import {TableForPacks} from "./TableForPacks";
import MainButton from "../../componens/mainButton/MainButton";

export const Packs = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const packs = useSelector<AppRootStateType, Array<CardPacksType>>(state => state.packs.cardPacks)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch])

    const createNewPack = () => {
        dispatch(createPackTC())
    }

    if (!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            Колоды
            <div>
                <MainButton onClick={createNewPack}>Создать колоду</MainButton>
            </div>

            <TableForPacks/>
        </div>
    )
}