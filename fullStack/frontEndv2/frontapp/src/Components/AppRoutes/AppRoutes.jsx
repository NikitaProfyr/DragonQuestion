import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import AuthService from '../../Services/AuthService'
 
import { ROUTES } from '../../utils/routes'
 
import Footer from '../Footer/Footer'

import Header from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import Login from '../Login/Login'
import Registration from '../Registration/Registration'
 


const AppRoutes = () => {
  const [user, getUser] = useState(null)
  
  console.log(AuthService.getUserName()) 

  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {
        <>
          <Header/>
          <AuthService.getUserName/>
          <HomePage/>
          <Footer/>
        </>}/>
        <Route path='/authorization' element = {
        <>
          <Header/>
          <Login/>
        </>}/>
        <Route path={ROUTES.REGISTRATION} element = {
        <>
          <Header/>
          <Registration/>
        </>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes