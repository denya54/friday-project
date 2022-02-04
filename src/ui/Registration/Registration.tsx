import s from "./Registration.module.css"
import SuperInputText from "../../SuperComponents/SuperInputText/SuperInputText";
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";

export const Registration = () => {

    return (
        <div>
            <h2>It-incubator</h2>
            <p>Sign Up</p>
            <form className={s.form} action="">
                <div>
                    <SuperInputText type="email"
                                    placeholder={"Email"}
                    />
                </div>
                <div>
                    <SuperInputText type="password"
                                    placeholder={"password"}
                    />
                </div>
                <div>
                    <SuperInputText type="password"
                                    placeholder={"Confirm password"}
                    />
                </div>
                <div>
                    <SuperButton>Register</SuperButton>
                </div>
            </form>
        </div>
    )
}