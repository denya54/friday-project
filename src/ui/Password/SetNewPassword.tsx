import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import {ChangeEvent, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {createNewPasswordTC, setErrorAC} from "../../bll/recoveryPasswordReducer";


export const SetNewPassword = () => {

    const error = useSelector<AppRootStateType, boolean>(state => state.password.error)
    const disabledButton = useSelector<AppRootStateType, boolean>(state => state.password.disabledButton)
    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.password.isSuccess)
    const errorMessage = useSelector<AppRootStateType, string>(state => state.password.errorMessage)

    const [newPasswordField1, setNewPasswordField1] = useState('')
    const [newPasswordField2, setNewPasswordField2] = useState('')


    const changeNewPasswordField1 = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPasswordField1(e.currentTarget.value)
        dispatch(setErrorAC(false))
    }

    const changeNewPasswordField2 = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPasswordField2(e.currentTarget.value)
        dispatch(setErrorAC(false))
    }

    const dispatch = useDispatch()
    const {token} = useParams<'token'>()

    const createNewPasswordHandler = () => {

        dispatch(createNewPasswordTC(newPasswordField1, newPasswordField2, token || ''))
        setNewPasswordField1('')
        setNewPasswordField2('')
    }

    if (isSuccess) {
        return <Navigate to={'/password_recovery_success'}/>;
    }

    return (

        <div>
            <h4>Введите новый пароль и постарайтесь его не забыть)</h4>
            {error
                ? <SuperInputText value={newPasswordField1} onChange={changeNewPasswordField1}
                                  error={errorMessage} type={'password'}/>
                : <SuperInputText value={newPasswordField1} onChange={changeNewPasswordField1} type={'password'}/>
            }
            <div>
                <p>Повторите пароль</p>
                <SuperInputText value={newPasswordField2} onChange={changeNewPasswordField2} type={'password'}/>
            </div>
            <div>

                <SuperButton onClick={createNewPasswordHandler} disabled={disabledButton}>Создать новый
                    пароль</SuperButton>
            </div>

        </div>
    )
}