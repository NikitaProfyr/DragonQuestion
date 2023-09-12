import React from 'react'
import HeaderBase from './HeaderBase'
import HeaderUser from './HeaderUser'

const Header = () => {
    
    let user = {name:'test'} 

    if (typeof user === undefined){
        return (
            <HeaderBase/>      
        )
    }
    else{
        return (
            <HeaderUser/>      
        )
    }
}

export default Header