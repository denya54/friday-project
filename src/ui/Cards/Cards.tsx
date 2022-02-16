import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {getUserDataTC} from "../../bll/authReducer";

export const Cards = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const userName = useSelector<AppRootStateType, string>(state => state.login.name)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserDataTC())
    }, [])



    if (!isLogged) {
        return <Navigate to="/login"/>
    }


    return (
        <div>

            <h3>Вы вошли как {userName}</h3>
            Cards
        </div>

    )
}