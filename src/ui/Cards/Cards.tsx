import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import {cardsAPI} from "../../dal/cardsAPI";
import {TableForCards} from "./TableForCards";
import {getCards} from "../../bll/cardReducer";

export const Cards = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const dispatch = useDispatch()



    const createNewCard = () => {
        cardsAPI.createCard('620ea6cfb185f020a81a9f61')
        dispatch(getCards())
    }

    const updateCard = () => {
        cardsAPI.updateCard('Как дела', '620f8db4d24e5520608fcae1')
        dispatch(getCards())
    }
    const deleteCard = () => {
        cardsAPI.deleteCard('620f8db4d24e5520608fcae1')
        dispatch(getCards())
    }

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch])

    if (!isLogged) {
        return <Navigate to="/login"/>
    }


    return (
        <div>
            Карты фывфывф
            <div>
                <MainButton onClick={createNewCard}>Создать карту</MainButton>
                <MainButton onClick={updateCard}>Изменить карту</MainButton>
                <MainButton onClick={deleteCard}>Удалить карту</MainButton>

            </div>
            <TableForCards/>

        </div>

    )
}