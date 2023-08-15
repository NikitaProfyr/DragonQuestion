import React from "react";
import LogoImg from '../../image/logo.png'
// import { NavLink } from "react-router-dom";
import './header.css'

export class Header extends React.Component{
    render() {
        return(
            <div className="wrapper">
                <div className="Header">
                
                    <div className="logo">
                        <img src={LogoImg} height="40" alt="Logo" />
                    </div>
                    <div className="nav-bar">
                        <a href="#">Авторизация</a>
                    </div>
                </div>
            </div>
            
        )
    }
}