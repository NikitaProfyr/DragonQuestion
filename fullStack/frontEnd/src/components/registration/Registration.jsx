import React from "react";
import DraconImg from '../../image/drakonEgor.png'
import logo from "../../image/logo.png"
import { Link } from "react-router-dom";
import './registration.css'

export class Registration extends React.Component{

    render(){
        return(
            <>
                <div className="bg-registration">
                    <img src={DraconImg} width="700px" alt=""  className="dragon-img-registration"/>
                    <div className="bg-content-registration">
                        <div className="content-registration">
                            <b>РЕГИСТРАЦИЯ</b>
                            <form>
                                <div className="form-input-registration">
                                    <input placeholder="Введите email" type="email" name="email"/>
                                    <input placeholder="Введите пароль" type="password" name="password" />
                                    <input placeholder="Повторите пароль" type="password" name="password" />
                                    <div className="checkbox-tumpler">
                                        <div className="checkbox-user">Пользователь</div>
                                        <div className="checkbox-creater">Автор</div>
                                    </div>
                                </div>
                                <button type="submit" formMethod="post">ЗАРЕГИСТРИРОВАТЬСЯ</button>
                            </form>
                            <Link to="/authorization">ВОЙТИ В АККАУНТ</Link>
                            
                            <img src={logo} alt="" width="110px" className="logo-content-registration" />
                        </div>
                        
                        
                    </div>
                </div>
            </>
        )
    }
}