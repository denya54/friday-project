import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import {ChangeEvent, useState} from "react";
import {ForgotPasswordAPI} from "../../dal/API";
import {Navigate, useParams} from "react-router-dom";


export const SetNewPassword = () => {
    const [newPasswordField, setNewPasswordField] = useState('')
    const changeNewPasswordField = (e: ChangeEvent<HTMLInputElement>) => setNewPasswordField(e.currentTarget.value)

    const {token} = useParams<'token'>()

    const createNewPasswordHandler = () => {
        ForgotPasswordAPI.setNewPassword(newPasswordField, token || '')
            .then((res) => {
                return <Navigate to={'/'}/>
            })
            .catch(err => {
                alert('Пароль должен содержать не менее 8 символов')
                setNewPasswordField('')
            })
    }

    return (

        <div>
            <h4>Введите новый пароль и постарайтесь его не забыть)</h4>
            <SuperInputText value={newPasswordField} onChange={changeNewPasswordField}/>
            <SuperButton onClick={createNewPasswordHandler}>Создать новый пароль</SuperButton>
        </div>
    )
}