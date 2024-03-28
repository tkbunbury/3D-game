import { useNavigate } from 'react-router-dom';
import './FinalScore.css';

function FinalScore({ score, isNewHighScore, leaderboardPosition }) {
    const navigate = useNavigate();
    score = 99999
    leaderboardPosition = 1

    const handleFlyAgainClick = () => {
        navigate('/game')
    };

    const handleLeaderboardClick = () => {
        navigate('/leaderboard');
    };

    const handleLogout = () => {
        // We need to add Logic to logout the user and clear user data from local storage)
        navigate('/');
    };

    return (
        <div className="final-score-page">
            <h1 className="score-header">
                {isNewHighScore ? 'NEW HIGH SCORE!' : 'Your Final Score'}
            </h1>
            <p className="score">{score}</p>
            <p className="position">
                {isNewHighScore ? 'Congratulations! You made it to position ' : 'Your position on the leaderboard is '}
                {leaderboardPosition}
            </p>
            
            <button className="fly-again-button" onClick={handleFlyAgainClick}>Fly Again</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="leaderboard-button" onClick={handleLeaderboardClick}>
                Go to Leaderboard
            </button>
        </div>
    );
}

export default FinalScore;