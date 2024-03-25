import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage/LoginPage'
import Leaderboard from './components/Leaderboard/Leaderboard'
import StartScreen from './components/StartScreen/StartScreen'
import FinalScore from './components/FinalScore/FinalScore'


function App() {
  

  return (
    <BrowserRouter>
      <div className="container">
        <h1 className="game-title">3D Game</h1>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/leaderboard' element={<Leaderboard/>}/>
              <Route path='/startscreen' element={<StartScreen/>}/>
              <Route path='/finalscore' element={<FinalScore/>}/>
            </Routes>  
      </div>
    </BrowserRouter>
  )
}

export default App
