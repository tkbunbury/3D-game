import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext/userContext';
import { useAuth } from "../../Contexts/AuthContext/authContext";
import { doSignOut } from "../firebase/auth";
import './StartScreen.css';
import GameStatsContext from '../../Contexts/GameStatsContext/GameStatsContext';
import { useContext } from 'react';

function StartScreen() {
    const navigate = useNavigate();
    const { currentUser, setUserLoggedIn, userLoggedIn } = useAuth();
	const { user, users, setUser, setUsers, setCurrentScore } = useUser();
    const {gameEnvironment, setGameEnvironment, setAllWords, soundOn, setSoundOn} = useContext(GameStatsContext)

    const handleLogout = () => {
        doSignOut(setUser, setUserLoggedIn);
    };

    const handleBackToLogin = () => {
        navigate('/');
    };

    return (
        <div className="start-screen">
            <h1>{user.username ? `You ready to go ${user.username}?` : "Welcome mystery person!"} </h1>
            <p>You have five lives to guess the word at the top of the screen, collect a letter to make a guess. </p>
            <p>Use the arrow keys to change direction, shift for afterburners. If you get lost, use 'r' to reset.</p> 
            <p>Good Luck!</p>
            <button className="take-flight-button" onClick={() => {
                setAllWords([])
                setCurrentScore(0)
                navigate('/game')}}>Take Flight</button>
            <p>Level Selected: {gameEnvironment}</p>
            <p>Sound? : {soundOn ? 'on' : 'muted'}</p>
            <div className="game-options-container">
                <button className="options-button" onClick={() => setGameEnvironment('Heaven')}>Heaven</button>
                <button className="options-button" onClick={() => setGameEnvironment('Underwater')}>Underwater</button>
                <button className="options-button" onClick={() => setGameEnvironment('Space')}>Space</button>
                <button className="options-button" onClick={() => setGameEnvironment('Playstation 1')}>Playstation 1</button>
                <button className="options-button" onClick={() => setSoundOn((curr) => !curr)}>Sound?</button>
            </div>

            {user.username ? 
                <p>Your current high score is {user.highscore}</p> 
                : 
                <p>You will be unable to record your score without signing in you know?</p>
            }
            
            
            {userLoggedIn ? 
                <button className="logout-button" onClick={handleLogout}>Logout?</button> 
                : 
                <button className="back-to-login-button" onClick={handleBackToLogin}>Login?</button>
            }
            
            <button className="leaderboard-button" onClick={() => navigate('/leaderboard')}>Leaderboard</button>
        </div>
    );
}

export default StartScreen;