import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import LogoImg from '../../image/logo.png'

const HeaderBase = () => {
  return (
      <div className="wrapper">
          <div className="Header">
          
              <div className="logo">
                <Link to={ROUTES.HOME}><img src={LogoImg} height="40" alt="Logo" /></Link>  

              </div>
              <div className="nav-bar">
                  {/* <a href="#"></a> */}
                  <Link to="/authorization">Авторизация</Link>
              </div>
          </div>
      </div>
      
  )
}

export default HeaderBase