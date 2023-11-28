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
        if (user !== null){
            setLoader(false)
        }
    }, [user]) 

    if (loader){
        // return <Spinner animation='grow'/>
    }
    else{
        return(
            <div className="Header-bg">
                <div className="container">
                    <div className="Header">    
                        <div className="logo">
                            <Link to={ROUTES.QUIZ_LIST}><img src={LogoImg} height="40" alt="Logo" /></Link>
                        </div>
                        <div className="header-menu">
                            <div className="nav-bar">
                                <Link to={ROUTES.QUIZ_LIST} className="link-quiz">Опросы</Link>
                                <Link to={ROUTES.QUIZ_USER}>Мои опросы</Link>
                                <a href="#">О нас</a>
                                <Link to={ROUTES.USER_SETTING}>{user.userName}</Link>
                            </div>
                        </div>
                        <div className="burger-button">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
    
}

export default HeaderUser