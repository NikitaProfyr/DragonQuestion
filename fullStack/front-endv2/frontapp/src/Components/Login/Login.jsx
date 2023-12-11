import React, { useState } from 'react'
import { Link, useNavigate} from "react-router-dom";

import DraconImg from '../../image/drakonEgor.png'
import logo from "../../image/logo.png"
import './autorization.css'
 
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../Feutures/Reducers/rootReduser';
import { loginAction } from '../../Feutures/Actions/actionUser';
import { ROUTES } from '../../utils/routes';
import { useEffect } from 'react';


const Login = () => {
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const user = useSelector(state => state.reducerUser.userInfo)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const onClickLogin = async (e) => {
        e.preventDefault()
        const data = await loginAction(userName, password)
        .catch((e) => {
            console.log(e);
            alert("Не правильный логин или пароль.")
        })
        store.dispatch(data)
         
    }

    useEffect(() => {
        if(user !== null) {
            return navigate(ROUTES.QUIZ_LIST)
        }
    }, [user])

    

    return (
        <>
            <div className="bg-autorization">
                <img src={DraconImg} width="700px" alt="" className="dragon-img-autorization" />
                <div className="bg-content-autorization">
                    <div className="content-autorization">
                        <b>ВОЙТИ</b>

                        <form onSubmit={onClickLogin}>
                            <div className="form-input-autorization">
                                <input onChange={e => (setUserName(e.target.value))} type="text" name="userName" placeholder="Введите имя пользователя" required />
                                <input onChange={e => (setPassword(e.target.value))} type="password" name="password" placeholder="Введите пароль" required />
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



export default Login