import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import { useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage'
import Leaderboard from './components/Leaderboard/Leaderboard'
import StartScreen from './components/StartScreen/StartScreen'
import FinalScore from './components/FinalScore/FinalScore'
import GameIndex from './components/Game/GameIndex';

function App() {

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  
  return (
    <BrowserRouter>
      <div className="container">
        <Link to="/">
        <h1 className="game-title">Hangman Heaven</h1>
        </Link>
            <Routes>
              <Route path='/' element={<LoginPage setIsCreatingAccount={setIsCreatingAccount} isCreatingAccount={isCreatingAccount}/>} />
              <Route path='/leaderboard' element={<Leaderboard/>}/>
              <Route path='/startscreen/:username' element={<StartScreen setIsCreatingAccount={setIsCreatingAccount} isCreatingAccount={isCreatingAccount}/>} />
              <Route path='/finalscore' element={<FinalScore/>}/>
              <Route path='/game' element={<GameIndex/>}/>
            </Routes>  
      </div>
    </BrowserRouter>
  )
}

export default App
