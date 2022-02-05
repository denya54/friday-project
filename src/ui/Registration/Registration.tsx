import s from "./Registration.module.css"
import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signUpTC} from "../../bll/register-reduser";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";

export const Registration = () => {
    console.log ('registration is render')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const dispatch = useDispatch();
    const RegisterCallback = (
        () => dispatch(signUpTC(email, password, password2))
    )

    const success = useSelector<AppRootStateType, boolean >(state=> state.register.success)
    const error = useSelector<AppRootStateType, null|string>(state => state.register.error)

    if (success) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            <h2>It-incubator</h2>
            <p>Sign Up</p>
            <form className={s.form} action="">
                <div>
                    <SuperInputText type="email"
                                    placeholder={"Email"}
                                    value={email}
                                    onChangeText={setEmail}
                    />
                </div>
                <div>
                    <SuperInputText type="password"
                                    placeholder={"password"}
                                    value={password}
                                    onChangeText={setPassword}
                    />
                </div>
                <div>
                    <SuperInputText type="password"
                                    placeholder={"Confirm password"}
                                    value={password2}
                                    onChangeText={setPassword2}
                    />
                </div>
                <div>
                    <SuperButton type='button' onClick={RegisterCallback}>Register</SuperButton>
                </div>
            </form>
           {error? <span className={s.error}>{error}</span>: null}
        </div>
    )
}