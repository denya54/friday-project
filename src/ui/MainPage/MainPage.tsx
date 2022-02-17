import React from "react";
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import {useNavigate} from "react-router-dom";
import MainButton from "../../componens/mainButton/MainButton";

export const MainPage = () => {

    const navigate = useNavigate();

    const redirectToProfile = () => navigate('/profile')

    return (
        <div>
            <LogoTitle/>
            <h3>Добро пожаловать!</h3>
            <div>
                Этот мини-сайт сделали для вас следующие люди:
                <a href={'https://github.com/KseniyaMelnik'}> Ксения Мельник </a>
                <a href={'https://github.com/denya54'}> Хвесеня Денис </a>
                <a href={'https://github.com/vladward'}>Владислав Малохвей</a>
            </div>

            <div>
                За красивое оформление отвечала:
                <a href={'https://github.com/Evgeniya-junior'}> Евгения Ложкина</a>
            </div>

            <div>
                И все это разрабатывалось под руководством:
                <a href={'https://github.com/IgnatZakalinsky'}> Игнат Закалинский</a>
            </div>
            <MainButton onClick={redirectToProfile}>Стартуем</MainButton>

        </div>
    )
}