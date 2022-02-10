import React from "react";
import InputText from "../../componens/inputText/InputText";
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import MainButton from "../../componens/mainButton/MainButton";

export const MainPage = () => {
    return (
        <div>
            <LogoTitle></LogoTitle>
            MainPage
            <InputText/>
            <MainButton>Click ME</MainButton>

        </div>
    )
}