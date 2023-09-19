import React, { useState, useEffect } from 'react'
import HeaderBase from './HeaderBase'
import HeaderUser from './HeaderUser'
import './header.css'

const Header = () => {
    // const [user, setUser] = useState(null)
    let user = null
    const setUser = (user) => {
        // user = {username:'test'}
        // console.log(document.cookie)
        user = null
        return user 
    }
      
    
    if (setUser(user) === null){
        return (
            <HeaderBase/>      
        )
    }
    else{
        return (
            <HeaderUser user={setUser(user)} />      
        )
    }
}

export default Header