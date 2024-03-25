import { useNavigate, useParams } from 'react-router-dom';
import './StartScreen.css';

function StartScreen({ isCreatingAccount }) {
    const navigate = useNavigate();
    const { username } = useParams();

    const handleLogout = () => {
        // We need to add Logic to logout the user and clear user data from local storage)
        navigate('/');
    };

    return (
        <div className="start-screen">
            <h1>{isCreatingAccount ? "Welcome" : "Welcome back"} {username}</h1>
            {(username !== "Guest") && <p>Your high score is: ...</p>}
            <button className="take-flight-button">Take Flight</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="leaderboard-button" onClick={() => navigate('/leaderboard')}>
                Go to Leaderboard
            </button>
        </div>
    );
}

export default StartScreen;