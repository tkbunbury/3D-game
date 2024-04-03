import { Routes, Route, Link, UNSAFE_useRouteId } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import StartScreen from "./components/StartScreen/StartScreen";
import FinalScore from "./components/FinalScore/FinalScore";
import GameIndex from "./components/Game/GameIndex";
import { useUser } from "./Contexts/UserContext/userContext";

function App() {
  const { user, users } = useUser()
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  return (
    <div className="container">
      <Link to="/">
        <h1 className="game-title">Hangman Heaven {user.username && " - " + user.username}</h1>
      </Link>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              setIsCreatingAccount={setIsCreatingAccount}
              isCreatingAccount={isCreatingAccount}
            />
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/startscreen"
          element={
            <StartScreen
              setIsCreatingAccount={setIsCreatingAccount}
              isCreatingAccount={isCreatingAccount}
            />
          }
        />
        <Route path="/finalscore" element={<FinalScore />} />
        <Route path="/game" element={<GameIndex />} />
      </Routes>
    </div>
  );
}

export default App;
