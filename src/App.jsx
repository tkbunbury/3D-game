import { Routes, Route, Link, UNSAFE_useRouteId } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import StartScreen from "./components/StartScreen/StartScreen";
import FinalScore from "./components/FinalScore/FinalScore";
import GameIndex from "./components/Game/GameIndex";
import { useUser } from "./Contexts/UserContext/userContext";
import GameStatsContext from "./Contexts/GameStatsContext/GameStatsContext";
import { useState } from "react";

function App() {
  const { user } = useUser()
  const [finalWord, setFinalWord] = useState('')
  const [allWords, setAllWords] = useState([])
  const [soundOn, setSoundOn] = useState(true)
  const [gameEnvironment, setGameEnvironment] = useState('Heaven')
  
  return (
    <GameStatsContext.Provider value={{finalWord, setFinalWord, allWords, setAllWords, gameEnvironment, setGameEnvironment, soundOn, setSoundOn }}>
    <div className="container">
      <Link to="/">
        <h1 className="game-title">Hangman Heaven {user.username && " - " + user.username}</h1>
      </Link>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage/>
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/startscreen"
          element={
            <StartScreen/>
          }
        />
        <Route path="/finalscore" element={<FinalScore />} />
        <Route path="/game" element={<GameIndex />} />
      </Routes>
    </div>
    </GameStatsContext.Provider>
  );
}

export default App;
