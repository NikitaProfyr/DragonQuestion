import React from "react";

import './autorization.css'

export class Autorization extends React.Component{

    render(){
        return(
            <>
                <div className="bg-autorization">
                    <div className="content-autorization">
                        <b>ВОЙТИ</b>
                        <form>
                            <div className="form-input-autorization">
                                <input placeholder="Введите email" type="email" name="email" />
                                <input placeholder="Введите пароль" type="password" name="password" />
                            </div>
                            <button type="submit" formMethod="post">ВОЙТИ</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}