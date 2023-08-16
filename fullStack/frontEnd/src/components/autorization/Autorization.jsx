import React from "react";
import DraconImg from '../../image/drakonEgor.png'
import logo from "../../image/logo.png"
import { Link } from "react-router-dom";
import './autorization.css'

export class Autorization extends React.Component{

    render(){
        return(
            <>
                <div className="bg-autorization">
                    <img src={DraconImg} width="700px" alt=""  className="dragon-img-autorization"/>
                    <div className="bg-content-autorization">
                        <div className="content-autorization">
                            <b>ВОЙТИ</b>
                            <form>
                                <div className="form-input-autorization">
                                    <input placeholder="Введите email" type="email" name="email" />
                                    <input placeholder="Введите пароль" type="password" name="password" />
                                </div>
                                <button type="submit" formMethod="post">ВОЙТИ</button>
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