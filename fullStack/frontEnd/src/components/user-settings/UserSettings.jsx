import React from "react";
import PurpleDragonEgor from '../../image/whitepurpleDragon.png'
import { Link } from "react-router-dom";
import './user-settings.css'

export class UserSettings extends React.Component{
    
    
    render() {
        return(
             <div className="bg-content-user-settings">
                <img src={PurpleDragonEgor} className="bg-dragon-settings" width="600px" />
                    <div className="wrapper">
                        <div className="all-content-user-settings">
                            <div className="left-content-settings">
                                <input type="file" id="file" multiple accept="image/*"/>
                                <img src="" alt="test" id="image" />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae assumenda facilis consequatur numquam aut rem sunt est obcaecati consectetur sequi temporibus praesentium excepturi earum quos, perspiciatis animi repudiandae quo blanditiis!
                            </div>
                            <div className="right-content-settings">
                                <div className="right-content-align">
                                    
                                    <div className="security-block-settings">
                                        <div className="content-security-block">
                                            <div className="change-password-block">
                                                <h1>БЕЗОПАСТНОСТЬ</h1>
                                                <h2>СМЕНА ПАРОЛЯ</h2>
                                                <h3>ТЕКУЩИЙ ПАРОЛЬ</h3>
                                                <input type="password"/>
                                                <h3>НОВЫЙ ПАРОЛЬ</h3>
                                                <input type="password"/>
                                                <h3>ПОДТВЕРДИТЕ НОВЫЙ ПАРОЛЬ</h3>
                                                <input type="password"/>
                                                <button>
                                                    Сменить пароль
                                                </button>
                                            </div>
                                            <div className="account-deletion-block">
                                                <h2>УДАЛЕНИЕ АККАУНТА</h2>
                                                <button>Удалить</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="button-user-settings">
                                        <button>
                                            Отмена
                                        </button>
                                        <button className="gradient-button-settings">
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
             </div>
        )
    }
}