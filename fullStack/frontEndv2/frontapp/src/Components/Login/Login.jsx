import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import Api from '../../Http';

import DraconImg from '../../image/drakonEgor.png'
import logo from "../../image/logo.png"
import AuthService from '../../Services/AuthService';
import './autorization.css'


const Login = () => {
    const [redirectToMain, setredirectToMain] = useState(false)

    const onClickRedirect = (dates) =>{
        let response = AuthService.login(dates.target.email.value, dates.target.password.value)
         
        console.log(response)
        setredirectToMain(true)
    }

    if (redirectToMain === true){
        return <Navigate to='/'/> 
    }
    else{
        return(
            <>
                <div className="bg-autorization">
                    <img src={DraconImg} width="700px" alt=""  className="dragon-img-autorization"/>
                    <div className="bg-content-autorization">
                        <div className="content-autorization">
                            <b>ВОЙТИ</b>
                            
                            <form onSubmit={onClickRedirect}>
                                <div className="form-input-autorization">
                                    <input type="email" name="email" placeholder="Введите email" required />
                                    <div className="error-message" id="emailError"></div>
                                    <input type="password" name="password" placeholder="Введите пароль" required />
                                    <div className="error-message" id="passwordError"></div>
                                </div>
                                <button type="submit">ВОЙТИ</button>
                            </form>
    
                            <a href=""><span>ЗАБЫЛ ПАРОЛЬ</span></a><br />
                            <Link to="/registration" className="link-to-registration">ЗАРЕГИСТРИРОВАТЬСЯ</Link>
                            
                            <img src={logo} alt="" width="110px" className="logo-content-autorization" />
                        </div>
                        
                        
                    </div>
                </div>
            </>
        )
    }
    
}

export default Login