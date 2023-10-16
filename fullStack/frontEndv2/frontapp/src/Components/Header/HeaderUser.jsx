import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from "react-router-dom";
import { logoutAction } from '../../Feutures/Actions/actionUser';

import LogoImg from '../../image/logo.png'
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
    }, []) 


    const onClickLogOut = () => {
        logoutAction(dispatch)
    }

    if (loader){
        // return <Spinner animation='grow'/>
    }
    else{
        return(
            <div className="Header-bg">
            <div className="wrapper">
                <div className="Header">
                    <div className="logo">
                        <Link to={ROUTES.QUIZ_LIST}><img src={LogoImg} height="40" alt="Logo" /></Link>
                    </div>
                    <div className="nav-bar">
                        <Link to="/authorization" className="link-quiz">Опросы</Link>
                        <Link to={ROUTES.QUIZ_USER}>Мои опросы</Link>
                        <Link to={ROUTES.USER_SETTING}>{user.userName}</Link>
                        <Link to={ROUTES.HOME} onClick={ onClickLogOut } >Выйди</Link>
                    </div>
                </div>
            </div>
            </div> 
        )
    }
    
}

export default HeaderUser