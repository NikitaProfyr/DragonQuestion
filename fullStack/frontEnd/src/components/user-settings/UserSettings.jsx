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
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae assumenda facilis consequatur numquam aut rem sunt est obcaecati consectetur sequi temporibus praesentium excepturi earum quos, perspiciatis animi repudiandae quo blanditiis!
                            </div>
                            <div className="right-content-settings">
                                <div className="security-block-settings">
                                    <h1>Безопастность</h1>
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
        )
    }
}