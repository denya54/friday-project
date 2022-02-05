import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import {ChangeEvent, useState} from "react";
import {ForgotPasswordAPI} from "../../dal/API";


export const PasswordRecovery = () => {

    const [emailAddressField, setEmailAddressField] = useState('')
    const changeEmailAddressField = (e: ChangeEvent<HTMLInputElement>) => setEmailAddressField(e.currentTarget.value)

    const sendEmailToServer = () => {
        ForgotPasswordAPI.forgotPassword(emailAddressField)
            .then(res => {
                alert(res.data.info)
            })


    }

    return (
        <div>
            <h3>Забыли пароль?</h3>
            <h4>Укажите email</h4>

            <SuperInputText value={emailAddressField} onChange={changeEmailAddressField}/>
            <p>Пожалуйста укажите email, который вы использовали для входа на сайт</p>
            <SuperButton onClick={sendEmailToServer}>Далее</SuperButton>
            <div><a href={'/login'}>Я вспомнил свой логин и пароль</a></div>

        </div>
    )
}