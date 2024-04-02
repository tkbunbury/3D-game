import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext/userContext';
import { useAuth } from "../../Contexts/AuthContext/authContext";
import { doSignOut } from "../firebase/auth";
import './StartScreen.css';

function StartScreen({ isCreatingAccount }) {
    const { user } = useUser()

    const navigate = useNavigate();
    const { currentUser, setUserLoggedIn, userLoggedIn } = useAuth();
	const { user, users, setUser, setUsers, setCurrentScore } = useUser();

    const handleLogout = () => {
        doSignOut();
		setUser({});
		setUserLoggedIn(false);
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
                setCurrentScore(0)
                navigate('/game')}}>Take Flight</button>
            
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