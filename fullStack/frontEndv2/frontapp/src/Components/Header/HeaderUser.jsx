import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { logoutAction } from '../../Feutures/Actions/actionUser';

import LogoImg from '../../image/logo.png'
import './header-user.css'

const HeaderUser = () => {
    const user = useSelector(state => state.reducerUser.userInfo)
    console.log(user)
    const dispatch = useDispatch()

    const onClickLogOut = () => {
        logoutAction(dispatch)
    }

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
                    <Link to="/authorization">{user.userName}</Link>
                    <Link to="#" onClick={ onClickLogOut } >Выйди</Link>
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