import React from 'react'
import { Link } from "react-router-dom";

import LogoImg from '../../image/logo.png'
import './header-user.css'

const HeaderUser = () => {
    // console.log(user)

    return(
        <div className="Header-bg">
        <div className="wrapper">
            <div className="Header">
                <div className="logo">
                    <img src={LogoImg} height="40" alt="Logo" />
                </div>
                <div className="nav-bar">
                    <Link to="/authorization" className="link-quiz">Опросы</Link>
                    <Link to="/authorization">Пройденные опросы</Link>
                    <Link to="/authorization">axe</Link>
                </div>
            </div>
        </div>
        <div className="smallHeader-bg">
            <div className="wrapper">
                <div className="smallHeader-content">

                    <Link to="/authorization">Создать запрос</Link>
                    <Link to="/authorization">Созданные опросы</Link>
                    <Link to="/authorization">Настройки профиля</Link>

                </div>
            </div>
        </div>
        </div> 
    )
}

export default HeaderUser