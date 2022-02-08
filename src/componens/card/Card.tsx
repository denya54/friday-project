import React from "react";
import s from './Card.module.css';
import SuperButton from "../../componens/SuperButton/SuperButton";
import SuperCheckbox from "../../componens/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../componens/SuperInputText/SuperInputText";
import InputPassword from "../../componens/InputPassword/InputPassword";


export const Card = (props: any) => {
    return (
        <div className={s.card}>
            <div className={s.container}>
                <h1 className={s.logo}>It-incubator</h1> 
                <h2 className={s.title}>{props.title}</h2>
                <div className={s.content}>
                    {/* <SuperInputText title="Email"></SuperInputText> 
                    <InputPassword title="Password"></InputPassword>
                    <SuperButton>Login</SuperButton>  */}
                </div>                                            
            </div>    
        </div>
    )
}