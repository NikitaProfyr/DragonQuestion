import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from '../../Page/IndexPage'
import LoginPage from '../../Page/LoginPage'
import QuizListPage from '../../Page/QuizListPage'
import AuthService from '../../Services/AuthService'
 
import { ROUTES } from '../../utils/routes'
 
import Footer from '../Footer/Footer'

import Header from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import Login from '../Login/Login'
import QuizList from '../QuizList/QuizList'
import Registration from '../Registration/Registration'
 


const AppRoutes = () => {
  const user = useSelector(state => state.reducerUser.userInfo)
  const isActive = useSelector(state => state.reducerUser.isActive)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {
          <IndexPage/>
        }/>
        <Route path={ROUTES.QUIZ_LIST} element = {
          <>
            <QuizListPage/>
          </>
        } />
        <Route path={ROUTES.LOGIN} element = {
        <>
          <LoginPage/>
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