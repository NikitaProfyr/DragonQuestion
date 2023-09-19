import React from 'react'

import './footer.css'
import logo from "../../image/logo.png"

const Footer = () => {
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

export default Footer