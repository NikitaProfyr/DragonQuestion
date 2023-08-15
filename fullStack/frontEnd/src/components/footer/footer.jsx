import React from "react";

// import { NavLink } from "react-router-dom";
import './footer.css'
import logo from "../../image/logo.png"

export class Footer extends React.Component{
    render() {
        return(
            <div className="Footer">
                <div className="wrapper">
                        <div className="footer-left">
                            <b>IBD Company©</b>
                            <p>Телефон:<span> +7(980)-326-13-85 , +7(915)-574-61-67</span></p>
                            <p>Почта:<span> IBD@gmail.com</span></p>
                            <p>Адрес:<span> г.Лос-Анджелес</span></p>
                        </div>
                        <div className="footer-right">
                            <img src={logo} alt="IBD" width="300px" />

                        </div>
                    
                    

                </div> 
            </div>
        )
    }
}