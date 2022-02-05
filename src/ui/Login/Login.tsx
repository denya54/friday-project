import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import {Link} from "react-router-dom";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import {useState} from "react";

export const Login = () => {

    const initialState = {
        email: '',
        password: ''
    }

    const [values, setValues] = useState({...initialState})

    const onSubmit = () => {
        console.log(values)
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
                <SuperInputText value={values.email}/>
            </div>
            <div>
                <SuperInputText value={values.password}/>
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