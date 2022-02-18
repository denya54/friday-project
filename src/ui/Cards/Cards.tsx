import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {getUserDataTC} from "../../bll/authReducer";
import MainButton from "../../componens/mainButton/MainButton";
import {cardsAPI} from "../../dal/cardsAPI";
import {TableForCards} from "./TableForCards";
import {getCards} from "../../bll/cardReducer";

export const Cards = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userName = useSelector<AppRootStateType, string>(state => state.login.name)

    const dispatch = useDispatch()
// удалить запрос
    useEffect(() => {
        dispatch(getUserDataTC())
    }, [])


    useEffect(() => {
        dispatch(getCards())
    }, [])


    const createNewCard = () => {
        cardsAPI.createCard('620ea6cfb185f020a81a9f61')
        dispatch(getCards())
    }

    const updateCard = () => {
        cardsAPI.updateCard ( 'Как дела','620f8db4d24e5520608fcae1')
        dispatch(getCards())
    }
    const deleteCard = () => {
        cardsAPI.deleteCard ( '620f8db4d24e5520608fcae1')
        dispatch(getCards())
    }


    if (!isLogged) {
        return <Navigate to="/login"/>
    }


    return (
        <div>
            <h3>Вы вошли как {userName}</h3>
            Карты
            <div>
                <MainButton onClick={createNewCard}>Создать карту</MainButton>
                <MainButton onClick={updateCard}>Изменить карту</MainButton>
                <MainButton onClick={deleteCard}>Удалить карту</MainButton>

            </div>
            <TableForCards/>

        </div>

    )
}