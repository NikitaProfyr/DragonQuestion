import React, { useState } from "react";
import { Link } from "react-router-dom";

import './registration.css'
import logo from "../../image/logo.png"
import DraconImg from '../../image/drakonEgor.png'
import AuthService from "../../Services/AuthService";


const Registration = () => {
    const [redirectToMain, setredirectToMain] = useState(false)
    const submitDataReg = (data) => {
        data.preventDefault()
        let userName = `${data.target.userName.value}`
        let password1 = `${data.target.password1.value}`
        let password2 = `${data.target.password2.value}`
        if (!userName || !password1 || !password2){
            return alert("Необходимо заполнить все поля!")
        }
        if (password1 !== password2){
            return alert("Пароли должны совподать.")
        }
        if (userName.length < 3) {
            return alert("Имя пользователя должно иметь более 3 символов.")
        }
        if (password1.length < 6) {
            return alert("Пароль должен иметь более 6 символов.")
        }
        setredirectToMain(AuthService.registration(userName, password1))
        
        if (redirectToMain === true){
            console.log("huy")
        }
    }
    return (
    <>         
        <div className="bg-registration">
            <img src={DraconImg} width="700px" alt=""  className="dragon-img-registration"/>
            <div className="bg-content-registration">
                <div className="content-registration">
                    <b>РЕГИСТРАЦИЯ</b>
                    <form onSubmit={submitDataReg}>
                        <div className="form-input-registration">
                            <input type="text" name="userName" placeholder="Введите имя пользователя" />
                            <input type="password" name="password1" placeholder="Введите пароль" />
                            <input type="password" name="password2" placeholder="Повторите пароль" />
                        </div>
                        <button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</button>
                    </form>
                    
                    <Link to="/authorization">ВОЙТИ В АККАУНТ</Link>
                    
                    <img src={logo} alt="" width="110px" className="logo-content-registration" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Registration