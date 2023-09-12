import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import Header from '../Header/Header'
 

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element = {
        <>
          <Header/>
        </>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes