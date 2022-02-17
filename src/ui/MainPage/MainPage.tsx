import React from "react";
import s from "./MainPage.module.css";
import InputText from "../../componens/inputText/InputText";
import LogoTitle from "../../componens/logoTitle/LogoTitle";
import MainButton from "../../componens/mainButton/MainButton";
import cards from "./../../assets/images/cards.png";
import union from "./../../assets/images/Union.png";

export const MainPage: React.FC = ({children}) => {
    return (
        <div className={s.main}>
            <div className={s.header}>
                <div className={s.logo}>
                    <LogoTitle></LogoTitle>
                </div> 
                <div className={s.navTabs}>
                    <button className={s.tabsBtn}><img src={cards} className={s.imgBtn}></img>Packs list</button>
                    <button className={s.tabsBtn}><img src={union} className={s.imgBtn}></img>Profile</button>
                </div>
            </div> 
            <div className={s.inner}>
                <aside className={s.aside}>
                    <h3 className={s.subTitle}>Show packs cards</h3>
                    <div className={s.asideBtn}>
                        <button className={s.btnMy}>My</button>
                        <button className={s.btnAll}>All</button>
                    </div>
                    <h3 className={s.subTitle}>Number of cards</h3>
                    
                </aside>
                <div className={s.contentOne} id="contentOne">
                            MainPage
                </div>
                <div className={s.contentTwo} id="contentTwo">
                            Packs list Petr’s 
                </div>
            </div>                                  
            {children}
        </div>
    )
}