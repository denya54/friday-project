import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {getUserDataTC} from "../../bll/authReducer";
import MainButton from "../../componens/mainButton/MainButton";
import {cardsAPI} from "../../dal/cardsAPI";

export const Cards = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userName = useSelector<AppRootStateType, string>(state => state.login.name)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserDataTC())
    }, [])



    const createNewCard = () => {
        cardsAPI.createCard('620ea6cfb185f020a81a9f61')
    }

    const giveCards = () => {
        cardsAPI.getCards('620ea6cfb185f020a81a9f61')
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
                <MainButton onClick={giveCards}>Запрос</MainButton>
            </div>

        </div>

    )
}