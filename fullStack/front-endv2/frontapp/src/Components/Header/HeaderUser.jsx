import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { logoutAction } from '../../Feutures/Actions/actionUser';

import LogoImg from '../../image/IBDnew.svg'
import { ROUTES } from '../../utils/routes';
import './header-user.css'

const HeaderUser = () => {
    const user = useSelector(state => state.reducerUser.userInfo)
    const [loader, setLoader] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        if (user !== null) {
            setLoader(false)
        }
    }, [user])

    if (loader) {
        // return <Spinner animation='grow'/>
    }
    else {
        return (
            <div className="Header-bg">
                <div className="container wow">
                    <div className="Header">
                        <div className="logo">
                            <Link to={ROUTES.QUIZ_LIST}><img src={LogoImg} height="40" alt="Logo" /></Link>
                        </div>
                        <div className="burger-button">
                            <span></span>
                        </div>
                        <div className="header-menu">
                            <ul className="nav-bar">
                                <li><Link to={ROUTES.QUIZ_LIST} className="link-quiz">Опросы</Link></li>
                                <li><Link to={ROUTES.QUIZ_USER} className="link-quiz">Мои опросы</Link></li>
                                <li><a href="#" className="link-quiz">О нас</a></li>
                                <li><Link to={ROUTES.USER_SETTING} className="link-quiz">{user.userName}</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default HeaderUser