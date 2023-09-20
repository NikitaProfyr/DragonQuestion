import React, { useState } from "react";
import { Link } from "react-router-dom";

import './registration.css'
import logo from "../../image/logo.png"
import DraconImg from '../../image/drakonEgor.png'

const Registration = () => {

  return (
    <>         
        <div className="bg-registration">
            <img src={DraconImg} width="700px" alt=""  className="dragon-img-registration"/>
            <div className="bg-content-registration">
                <div className="content-registration">
                    <b>РЕГИСТРАЦИЯ</b>
                    <div className="form-input-registration">
                        <input type="email" name="email" placeholder="Введите email" />
                            <div className="error-message">Ошибки для email</div>
                                <input type="password" name="password1" placeholder="Введите пароль" />
                            <div className="error-message">Ошибки для password1</div>
                            <input type="password" name="password2" placeholder="Повторите пароль" />
                            <div className="error-message">Ошибки для password2</div>
                        <div className="checkbox-tumpler">
                            <div className="checkbox-user">Пользователь</div>
                            <div className="checkbox-creater">Автор</div>
                        </div>
                    </div>
                    <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
                    <Link to="/authorization">ВОЙТИ В АККАУНТ</Link>
                    
                    <img src={logo} alt="" width="110px" className="logo-content-registration" />
                </div>
                
                
            </div>
        </div>
    </>
  )
}

export default Registration