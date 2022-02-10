
import {Link, Navigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../bll/authReducer";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import InputText from "../../componens/inputText/InputText";
import InputPassword from "../../componens/InputPassword/InputPassword";
import s from './Login.module.css'
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import TitlePage from "../../componens/titlePage/TitlePage";


const initialState = {
    email: '',
    password: '',
    rememberMe: false,
}

export const Login = () => {
    const [values, setValues] = useState({...initialState})
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    const onSubmit = () => {
        dispatch(loginTC(values))
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        setValues({
            ...values,
            [field]: field === 'rememberMe' ? e.currentTarget.checked : e.currentTarget.value
        })
    }

    if (isLogged) {
        return <Navigate to="/profile"/>
    }

    return (
        <div className={s.login}>
            <div className={s.container}>
                <LogoTitle></LogoTitle>
                <TitlePage title="Авторизация"></TitlePage>
                <InputText type="text" value={values.email}
                                onChange={e => onChangeValue(e, 'email')}/>           
                <InputPassword type="password" title='Password' value={values.password}
                                onChange={e => onChangeValue(e, 'password')}/>
            

            <div className={s.controlPas}>
                <div className={s.remember}>
                    <label className={s.rememberLabel}>Запомнить пароль</label>
                    <input className={s.rememberCheckbox} type="checkbox" checked={values.rememberMe}
                        onChange={e => onChangeValue(e, 'rememberMe')}/>
                </div>
                <div className={s.forgot}>
                    <Link className={s.link}to='/password_recovery'>Забыл пароль</Link>
                </div>   
            </div>

            <div>
                <MainButton className={s.mainButton} onClick={onSubmit}>Войти</MainButton>
                <p><span className={s.loginSpan}>Нет аккаунта?</span></p>
                <Link className={s.singLink} to="/registration">Зарегистрируйся</Link>
            </div>
            </div>
        </div>
    )
}