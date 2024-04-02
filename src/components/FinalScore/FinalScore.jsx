import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../Contexts/UserContext/userContext';
import './FinalScore.css';
import db from '../firebase/firebase';
import { doc, setDoc } from '@firebase/firestore';

function FinalScore() {
    const navigate = useNavigate();
    const { user, users, currentScore, setCurrentScore } = useUser()
    const [isHighscore, setIsHighscore] = useState(false)


    const newHighScore = (latestScore) => {
        if (latestScore > user.highscore){
            return true
        }
        else {
            return false
        }
    }

    const handleFlyAgainClick = () => {
        setCurrentScore(0)
        navigate('/game')
    };

    const handleLeaderboardClick = () => {
        navigate('/leaderboard');
    };

    const handleSubmitScoreClick = () => {
        const userRef = doc(db, "scores", user.email);
			setDoc(userRef, {
				highscore: currentScore,
				username: user.username,
				email: user.email,
			}).then(() => {
                setIsHighscore(true)
                console.log('score submitted')
            }).catch((err) => {
                console.log('error submitting score')
            })
    }

    const handleHome = () => {
        navigate('/');
    };
    
    return (
        <div className="final-score-page">
            <h1 className="score-header">
                {user.username ? 'Your highest score: ' + user.highscore + ' points' : 'Since you are not logged in, your high score cannot be saved'}
            </h1>
            <p className="score">You scored: {currentScore} points</p>
            <div className="position">
                {newHighScore(currentScore) ? <>
                    <p>Congratulations! You beat your previous best!</p>
                    <button onClick={handleSubmitScoreClick} className="logout-button">SUBMIT SCORE</button>
                    </>
                : 
                isHighscore ? `Nice one ${user.username}!` : `Give it another go mate you'll get it` }
                 
            </div>
            <button className="fly-again-button" onClick={handleFlyAgainClick}>Fly Again</button>
            <button className="logout-button" onClick={handleHome}>Home</button>
            <button className="leaderboard-button" onClick={handleLeaderboardClick}>Leaderboards</button>
        </div>
    );
}

export default FinalScore;