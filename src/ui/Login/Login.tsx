import {Link, Navigate} from "react-router-dom";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../bll/authReducer";
import {AppRootStateType} from "../../bll/store";
import MainButton from "../../componens/mainButton/MainButton";
import InputText from "../../componens/inputText/InputText";
import PasswordCheckbox from "../../componens/passwordCheckbox/PasswordCheckbox";
import s from './Login.module.css'
import {validateEmail, validatePassword} from "../../utils/validators/validator";

const initialState = {
    email: '',
    password: '',
    rememberMe: false,
}

const errorState = {
    email: '',
    password: '',
}

export const Login = () => {
    const [values, setValues] = useState({...initialState})
    const [type, setType] = useState<boolean>(false)
    const [error, setError] = useState({...errorState})

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const authError = useSelector<AppRootStateType, string>(state => state.login.authError)
    const dispatch = useDispatch()

    const onSubmit = () => {
        dispatch(loginTC(values))
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit()
        }
    }

    let inputType = type ? 'text' : 'password'

    const handleHidePassword = () => {
        setType(!type)
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        let value = field === 'rememberMe' ? e.currentTarget.checked : e.currentTarget.value

        setValues({
            ...values,
            [field]: value
        })

        if (field === 'email') {
            let err = validateEmail(e.currentTarget.value) ? "" : "Введите корректный email"
            setError({
                ...error,
                [field]: err
            })
        }

        if (field === 'password') {
            let err = validatePassword(e.currentTarget.value) ? "" : "Введите корректный пароль"
            setError({
                ...error,
                [field]: err
            })
        }
    }

    if (isLogged) {
        return <Navigate to="/profile"/>
    }

    return (
        <div className={s.login}>
            <div>
                <h2>It-incubator</h2>
            </div>

            <div>
                <h3>Sign in</h3>
            </div>

            <div>
                <InputText value={values.email}
                           placeholder="Email"
                           onKeyPress={onKeyPress}
                           onChange={e => onChangeValue(e, 'email')}
                           error={error.email}/>
            </div>
            <div>
                <InputText type={inputType}
                           value={values.password}
                           placeholder="Password"
                           onKeyPress={onKeyPress}
                           onChange={e => onChangeValue(e, 'password')}
                           error={error.password}/>
                <PasswordCheckbox onChange={handleHidePassword}/>
            </div>

            <div>
                Remember me
                <InputText type="checkbox" checked={values.rememberMe}
                           onChange={e => onChangeValue(e, 'rememberMe')}/>
            </div>

            <div>
                <Link to='/password_recovery'>Forgot password</Link>
            </div>

            <div>
                <MainButton onClick={onSubmit}>Login</MainButton>
                <div>
                <span>
                    Don't have an account?
                </span>
                    <Link to="/registration">
                        <h4>Sign in</h4>
                    </Link>
                </div>
            </div>
            {authError && <span className={s.err}>&#128165;{authError}&#128165;</span>}
        </div>
    )
}