import { useState } from 'react'
import { Route , Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import UserPage from './pages/UserPage'
import DashBoard from './pages/DashBoard'
import RallyToBePage from './pages/RallyToBePage'

function App() {
  

  return (
    <Routes>
      <Route path='/' element= { <HomePage />} />
      <Route path='/register' element= {<Register />} />
      <Route path='*' element= { <ErrorPage /> } />
      <Route path='/login' element= { <Login />} />
      <Route path='/user/:id' element= { <UserPage /> } />
      <Route path='/dashboard' element= { <DashBoard /> } />
      <Route path='/sign-rally/:id' element = {<RallyToBePage />} />
    </Routes>  
    )
}

export default App
