import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "./ui/MainPage/MainPage";
import {Login} from "./ui/Login/Login";
import {Registration} from "./ui/Registration/Registration";
import {Error404} from "./ui/Eror404/Error404";
import {PasswordRecovery} from "./ui/Password/PasswordRecovery";
import {SetNewPassword} from "./ui/Password/SetNewPassword";
import {Profile} from "./ui/Profile/Profile";
import {initializeTC} from "./bll/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import loader from './assets/loader.svg'

const App = () => {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <img src={loader} alt="loader"/>
        </div>
    }

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
                <Route path={'profile'} element={<Profile/>}/>
            </Routes>
        </div>
    )
}

export default App;
