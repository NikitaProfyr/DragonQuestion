import React, { useState, useEffect } from 'react'
import HeaderBase from './HeaderBase'
import HeaderUser from './HeaderUser'
import './header.css'
import { useSelector } from 'react-redux'

const Header = () => {

    return (
        <HeaderBase/>      
    )
    // if (isActive === false){
    //     return (
    //         <HeaderBase/>      
    //     )
    // }
    // else{
    //     return (
    //         <HeaderUser />      
    //     )
    // }
}

export default Header