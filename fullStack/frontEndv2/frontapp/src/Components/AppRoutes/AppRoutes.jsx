import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import IndexPage from '../../Page/IndexPage'
import LoginPage from '../../Page/LoginPage'
import QuizListPage from '../../Page/QuizListPage'
import UserSetingPage from '../../Page/UserSetingPage'
import RegistrationPage from '../../Page/RegistrationPage'

import AuthService from '../../Services/AuthService'
 
import { ROUTES } from '../../utils/routes'
import QuizDetailPage from '../../Page/QuizDetailPage'
import QuizUserDetailPage from '../../Page/QuizUserDetailPage'
import QuizUserPage from '../../Page/QuizUserPage'
import QuizCreatePage from '../../Page/QuizCreatePage'
 
const PublicRoutes = [
  {
      patch: ROUTES.HOME,
      Component: IndexPage,
  },
  {
      patch: ROUTES.LOGIN,
      Component: LoginPage,
  },
  {
      patch: ROUTES.REGISTRATION,
      Component: RegistrationPage,
  },
]

const PrivateRoutes = [
  {
      patch: ROUTES.QUIZ_LIST,
      page: QuizListPage,
  },
  {
      patch: ROUTES.USER_SETTING,
      page: UserSetingPage
  },
]
 


const AppRoutes = () => {
  const user = useSelector(state => state.reducerUser.userInfo)
  const isActive = useSelector(state => state.reducerUser.isActive)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* {PublicRoutes.map(({patch, page}) => <Route key={patch} patch={patch} Component={page} exact/>)}

        {isActive && PrivateRoutes.map(({patch, page}) => <Route key={patch} patch={patch} Component={page} exact/>)} */}

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
          <RegistrationPage/>
        </>}/>
        <Route path={ROUTES.USER_SETTING} element = {<UserSetingPage/>} />
        <Route path={ROUTES.QUIZ_DETAIL} element = {<QuizDetailPage/>}/>
        <Route path={ROUTES.QUIZ_USER} element = {<QuizUserPage/>} />
        <Route path={ROUTES.QUIZ_USER_DETAIL} element = {<QuizUserDetailPage/>} />
        <Route path={ROUTES.QUIZ_CREATE} element = {<QuizCreatePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes