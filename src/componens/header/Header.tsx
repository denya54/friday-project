import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <NavLink to={'/profile'}>Профиль </NavLink>
            <NavLink to={'/login'}>Логинизация </NavLink>
            <NavLink to={'/registration'}>Регистрация </NavLink>
            <NavLink to={'/password_recovery'}>ВосстановлениеПароля </NavLink>
            <NavLink to={'/'}>Главная </NavLink>
        </div>

    )
}