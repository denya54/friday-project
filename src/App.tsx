import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "./ui/MainPage/MainPage";
import {Login} from "./ui/Login/Login";
import {Registration} from "./ui/Registration/Registration";
import {Error404} from "./ui/Eror404/Error404";
import {PasswordRecovery} from "./ui/Password/PasswordRecovery";
import {SetNewPassword} from "./ui/Password/SetNewPassword";
import {TransitionalPage} from "./ui/Password/TransitionalPage";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'404'} element={<Error404/>}/>
                <Route path='*' element={<Navigate to={'/404'}/>}/>
                <Route path={'password_recovery'} element={<PasswordRecovery/>}/>
                <Route path={'set_new_password'} element={<SetNewPassword/>}/>
                <Route path={'transitional_page_for_recovery_pass'} element={<TransitionalPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
