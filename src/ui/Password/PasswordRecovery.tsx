import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import {ChangeEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import { passwordRecoveryTC, setErrorAC} from "../../bll/recoveryPasswordReducer";


export const PasswordRecovery = () => {

    const error = useSelector<AppRootStateType, boolean>(state => state.password.error)
    const disabledButton = useSelector<AppRootStateType, boolean>(state => state.password.disabledButton)
    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.password.isSuccess)
    const errorMessage = useSelector<AppRootStateType, string>(state => state.password.errorMessage)

    const dispatch = useDispatch()


    const [emailAddressField, setEmailAddressField] = useState('')
    const changeEmailAddressField = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailAddressField(e.currentTarget.value)
        dispatch(setErrorAC(false))
    }



    const sendEmailToServer = () => {
        dispatch(passwordRecoveryTC(emailAddressField))
        setEmailAddressField('')
    }

    if (isSuccess) {
        return <Navigate to={`/transitional_page_for_recovery_pass`}/>;
    }

    return (
        <div>
            <h3>Забыли пароль?</h3>
            <h4>Укажите email</h4>
            {error
                ? <SuperInputText value={emailAddressField} onChange={changeEmailAddressField} error={errorMessage}/>
                : <SuperInputText value={emailAddressField} onChange={changeEmailAddressField}/>
            }
            <p>Пожалуйста укажите email, который вы использовали для входа на сайт</p>
            <SuperButton onClick={sendEmailToServer} disabled={disabledButton}>Далее</SuperButton>
            <div><a href={'/login'}>Я вспомнил свой логин и пароль</a></div>

        </div>
    )
}