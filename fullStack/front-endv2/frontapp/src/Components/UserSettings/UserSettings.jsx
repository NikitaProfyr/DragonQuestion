import React from "react";
import './user-settings.css'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../Feutures/Actions/actionUser';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes'
import AuthService from '../../Services/AuthService';


const UserSettings = () => {
    const [cheackDel, setCheackDel] = useState(false)
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.reducerUser.userInfo)
    const [userName, setUserName] = useState(user.userName)
    const [email, setEmail] = useState(user.email)
    const navigate = useNavigate();
    const deleteUser = async () => {
        console.log(user)
        await AuthService.deleteCurrentUser(user.id)
        logoutAction(dispatch)
        return navigate(ROUTES.HOME)
        
        // нужно добавить подтверждение let cheack = confirm("Вы точно хотите удалить аккаунт?") при ok == true
    }
    const logOut = () => {
        logoutAction(dispatch)
        return navigate(ROUTES.HOME)
    }
    const userUpdateData = (e) => {
        e.preventDefault()
        console.log(email, userName)
        AuthService.updateUserData(userName, user.id ,email)
    }
    return (
        <div className="bg-content-user-settings">
            <div className="container">
                <div className="row setting-content-all d-flex align-items-center">
                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-lg-start justify-content-center">
                        <div className="form-setting d-flex justify-content-center align-items-center">
                            <div className="box-settings-content d-flex flex-column">
                                <h1>БЕЗОПАСТНОСТЬ</h1>
                                <h2>СМЕНА ПАРОЛЯ</h2>
                                <form>
                                    <h3>ТЕКУЩИЙ ПАРОЛЬ</h3>
                                    <input type="password" />
                                    <h3>НОВЫЙ ПАРОЛЬ</h3>
                                    <input type="password" />
                                    <h3>ПОДТВЕРДИТЕ НОВЫЙ ПАРОЛЬ</h3>
                                    <input type="password" />
                                    <button className="save-new-password-button">
                                        Сохранить
                                    </button>
                                </form>
                                <h2 className="title-del-user">УДАЛЕНИЕ АККАУНТА</h2>
                                <button onClick={deleteUser} className="del-button-setting-user"> Удалить </button>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-lg-end justify-content-center">
                        <div className="form-setting d-flex justify-content-center align-items-center">
                            <div className="box-settings-content pink-color-title d-flex flex-column">
                                <h1 color="#DD90E6">ЛИЧНЫЕ ДАННЫЕ</h1>
                                <form onSubmit={(e) => (userUpdateData(e)) }>
                                    <h3>ИМЯ ПРОФИЛЯ</h3>
                                    <input type="text" onChange={(e) => {setUserName(e.target.value)}} defaultValue={user.userName} />
                                    <h3 color="#DD90E6">EMAIL</h3>
                                    <input type="text" onChange={(e) => {setEmail(e.target.value)}} defaultValue={user.email} />
                                    <button type="submit" className="save-new-password-button">
                                        Сохранить
                                    </button>
                                </form>
                                <h2>ВЫЙТИ ИЗ АККАУНТА</h2>
                                <button onClick={logOut} className="save-new-password-button">
                                    ВЫЙТИ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserSettings