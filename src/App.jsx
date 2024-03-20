import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import Leaderboard from './components/Leaderboard/Leaderboard'
import StartScreen from './components/StartScreen/StartScreen'
import FinalScore from './components/FinalScore/FinalScore'


function App() {
  

  return (
    <BrowserRouter>
      <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/startscreen' element={<StartScreen/>}/>
        <Route path='/finalscore' element={<FinalScore/>}/>
      </Routes>  
      </>
    </BrowserRouter>
  )
}

export default App
