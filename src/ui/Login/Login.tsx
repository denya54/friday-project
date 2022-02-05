import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import {Link} from "react-router-dom";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginTC} from "../../bll/loginReducer";

export const Login = () => {

    const initialState = {
        email: '',
        password: ''
    }

    const [values, setValues] = useState({...initialState})
    const dispatch = useDispatch()

    const onSubmit = () => {
        dispatch(loginTC(values))
    }

    const onChangeEmail = (value: string) => {
        setValues({
            ...values,
            email: value
        })
    }

    const onChangePassword = (value: string) => {
        setValues({
            ...values,
            password: value
        })
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
                <SuperInputText value={values.email} onChangeText={onChangeEmail}/>
            </div>
            <div>
                <SuperInputText value={values.password} onChangeText={onChangePassword}/>
            </div>

            <div>
                <Link to='/'>Forgot password</Link>
            </div>

            <div>
                <SuperButton onClick={onSubmit} >Login</SuperButton>
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