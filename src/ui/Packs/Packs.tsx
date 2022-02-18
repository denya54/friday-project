import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getUserDataTC} from "../../bll/authReducer";
import {getPacks} from "../../bll/packReducer";
import {CardPacksType, packsAPI} from "../../dal/packsAPI";
import {TableForPacks} from "./TableForPacks";
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

    const updatePack = () => {
        packsAPI.updatePack('My third Pack','620fa1c8d24e5520608fcae4')
        dispatch(getPacks())
    }

    const deletePack = () => {
        packsAPI.deletePack('620fa1c8d24e5520608fcae4')
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
                <MainButton onClick={updatePack}>Изменить колоду</MainButton>
                <MainButton onClick={deletePack}>Удалить колоду</MainButton>

            </div>

            <TableForPacks
            />
        </div>
    )
}