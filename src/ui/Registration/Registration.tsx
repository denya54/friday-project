import s from "./Registration.module.css"
import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signUpTC} from "../../bll/register-reduser";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {validateEmail, validatePassword} from "../../utils/validators/validator";

export const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const dispatch = useDispatch();

    const RegisterCallback = (
        () => {dispatch(signUpTC(email, password, password2))}
    )

    const success = useSelector<AppRootStateType, boolean >(state=> state.register.success)
    const error = useSelector<AppRootStateType, null|string>(state => state.register.error)
    const isLoading = useSelector<AppRootStateType, boolean>(state=> state.register.isLoading)

    const errorEmail = validateEmail(email) ? "" : "Введите корректный email"
    const errorPassword = validatePassword(password) ? "" : "Пароль должен содержать не менее 8 символов"

    const disabled = isLoading || !!errorEmail || !!errorPassword

    if (success) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            <h2>It-incubator</h2>
            <p>Sign Up</p>
            {isLoading? <span> Loading...</span>: null}
            <form className={s.form} action="">
                <div>
                    <SuperInputText type="email"
                                    placeholder={"Email"}
                                    value={email}
                                    onChangeText={setEmail}
                                    error={errorEmail}
                    />
                </div>
                <div>
                    <SuperInputText type="password"
                                    placeholder={"password"}
                                    value={password}
                                    onChangeText={setPassword}
                                    error={errorPassword}
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
                    <SuperButton type='button'
                                 onClick={RegisterCallback}
                                 disabled={disabled}>
                        Register</SuperButton>
                </div>
            </form>
           {error? <span className={s.error}>{error}</span>: null}
        </div>
    )
}