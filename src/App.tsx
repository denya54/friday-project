import React from 'react';
import './App.css';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {MainPage} from "./ui/MainPage/MainPage";
import {Login} from "./ui/Login/Login";
import {Registration} from "./ui/Registration/Registration";
import {Error404} from "./ui/Eror404/Error404";
import {PasswordRecovery} from "./ui/Password/PasswordRecovery";
import {SetNewPassword} from "./ui/Password/SetNewPassword";

const App = () => {
    return (
        <div className="App">
            <div className="container">
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'404'} element={<Error404/>}/>
                <Route path='*' element={<Navigate to={'/404'}/>}/>
                <Route path={'/password_recovery'} element={<PasswordRecovery/>}/>
                <Route path={'/set_new_password'} element={<SetNewPassword/>}/>
            </Routes>
            </div>
        </div>
    );
}

export default App;
