import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import {Link, Navigate} from "react-router-dom";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../bll/authReducer";
import {AppRootStateType} from "../../bll/store";

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
        <div>
            <div>
                <h2>It-incubator</h2>
            </div>

            <div>
                <h3>Sign in</h3>
            </div>

            <div>
                <SuperInputText type="password" value={values.email}
                                onChange={e => onChangeValue(e, 'email')}/>
            </div>
            <div>
                <SuperInputText type="password" value={values.password}
                                onChange={e => onChangeValue(e, 'password')}/>
            </div>

            <div>
                Remember me
                <input type="checkbox" checked={values.rememberMe}
                       onChange={e => onChangeValue(e, 'rememberMe')}/>
            </div>

            <div>
                <Link to='/password_recovery'>Forgot password</Link>
            </div>

            <div>
                <SuperButton onClick={onSubmit}>Login</SuperButton>
                <div>
                <span>
                    Don't have an account?
                </span>
                    <Link to="/">
                        <h4>Sign in</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}