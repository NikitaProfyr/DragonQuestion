import React from "react";
import './user-settings.css'


const UserSettings = () => {
    return (
        <div className="bg-content-user-settings">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-lg-start justify-content-center py-5">
                        <div className="form-setting d-flex justify-content-center align-items-center">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis quo repellat placeat atque quos exercitationem a, eveniet inventore esse doloribus repudiandae expedita ab iure beatae cumque tenetur eum maiores?
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-lg-end justify-content-center py-5">
                        <div className="form-setting d-flex justify-content-center align-items-center">
                            <div className="box-settings-content">
                                <h1>БЕЗОПАСТНОСТЬ</h1>
                                <h2>СМЕНА ПАРОЛЯ</h2>
                                <form>
                                    <h3>ТЕКУЩИЙ ПАРОЛЬ</h3>
                                    <input type="text" />
                                    <h3>НОВЫЙ ПАРОЛЬ</h3>
                                    <input type="password" />
                                    <h3>ПОДТВЕРДИТЕ НОВЫЙ ПАРОЛЬ</h3>
                                    <input type="password" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserSettings