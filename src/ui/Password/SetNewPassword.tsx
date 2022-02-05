import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import {ChangeEvent, useState} from "react";
import {ForgotPasswordAPI} from "../../dal/API";


export const SetNewPassword = () => {
    const [newPasswordField, setNewPasswordField] = useState('')
    const changeNewPasswordField = (e: ChangeEvent<HTMLInputElement>) => setNewPasswordField(e.currentTarget.value)

    const currentlyURL = ''

    const createNewPasswordHandler = () => {
        ForgotPasswordAPI.setNewPassword(newPasswordField, currentlyURL)
            .then(res => {
                alert(res.data.info)
            })
    }

    return (

        <div>
            <h4>Введите новый пароль и постарайтесь его не забыть)</h4>
            <SuperInputText value={newPasswordField} onChange={changeNewPasswordField} />
            <SuperButton onClick={createNewPasswordHandler}>Создать новый пароль</SuperButton>
        </div>
    )
}