import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import { createPackTC, getPacks, setMyPacks} from "../../bll/packReducer";
import {TableForPacks} from "./TableForPacks";
import MainButton from "../../componens/mainButton/MainButton";
import s from "../Login/Login.module.css";
import {getUserDataTC} from "../../bll/authReducer";

export const Packs = () => {

    const [onlyMy, setOnlyMy] = useState(false)

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userID = useSelector<AppRootStateType, string>(state => state.login.userID)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch])

    const createNewPack = () => {
        dispatch(createPackTC())
    }

    useEffect(() => {
        dispatch(getUserDataTC())
    }, [])

    const changeMyPacksSee = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.currentTarget.checked === true) {
            setOnlyMy(e.currentTarget.checked)
            dispatch(setMyPacks(userID))
            dispatch(getPacks())
        } else {
            setOnlyMy(e.currentTarget.checked)
            dispatch(setMyPacks(''))
            dispatch(getPacks())
        }
    }

    if (!isLogged) {
        return <Navigate to="/login"/>
    }

    return (
        <div>
            Колоды
            <div>
                Только мои Колоды
                <input className={s.rememberCheckbox} type="checkbox" checked={onlyMy} onChange={changeMyPacksSee}
                />
            </div>

            <div>
                <MainButton onClick={createNewPack}>Создать колоду</MainButton>
            </div>

            <TableForPacks/>
        </div>
    )
}