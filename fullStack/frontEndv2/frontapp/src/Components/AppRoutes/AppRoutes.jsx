import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { chekLoginAction, getUserAction } from '../../Feutures/Actions/actionUser'
import AuthService from '../../Services/AuthService'
 
import { ROUTES } from '../../utils/routes'
 
import Footer from '../Footer/Footer'

import Header from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import Login from '../Login/Login'
import Registration from '../Registration/Registration'
 


const AppRoutes = () => {
  const dispatch = useDispatch()
  
  const accessToken = localStorage.getItem('accessToken')
  if(accessToken === null){
    console.log(accessToken);
  } 
  else{
    AuthService.getUserInfo(accessToken)
    .then(response => {
      // console.log(response);
      dispatch(getUserAction(response))
      dispatch(chekLoginAction(true));
       
    }) 
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {
        <>
          <Header/>
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