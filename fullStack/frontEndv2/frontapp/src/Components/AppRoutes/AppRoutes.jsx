import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthService from '../../Services/AuthService'
 
import { ROUTES } from '../../utils/routes'
 
import Footer from '../Footer/Footer'

import Header from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import Login from '../Login/Login'
import QuizList from '../QuizList/QuizList'
import Registration from '../Registration/Registration'
 


const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {
        <>
          <Header/>
          <HomePage/>
          <Footer/>
        </>}/>
        <Route path={ROUTES.QUIZ_LIST} element = {
          <>
            <Header/>
            <QuizList/>
            <Footer/>
          </>
        } />
        <Route path={ROUTES.LOGIN} element = {
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