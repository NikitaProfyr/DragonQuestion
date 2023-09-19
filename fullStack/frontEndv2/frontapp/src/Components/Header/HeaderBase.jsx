import React from 'react'
import { Link } from 'react-router-dom'

import LogoImg from '../../image/logo.png'

const HeaderBase = () => {
  return (
      <div className="wrapper">
          <div className="Header">
          
              <div className="logo">
                  <img src={LogoImg} height="40" alt="Logo" />
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