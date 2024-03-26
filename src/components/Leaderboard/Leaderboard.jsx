import React from 'react';
import './Leaderboard.css';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {
    // Dummy data for leaderboard
    const leaderboardData = [
        { rank: 1, username: 'User1', highscore: 1000 },
        { rank: 2, username: 'User2', highscore: 900 },
        { rank: 3, username: 'User3', highscore: 800 },
    ];

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleLogoutClick = () => {
        // We need to add Logic to logout the user and clear user data from local storage)
        navigate('/');
    };

    return (
        <div className="leaderboard">
            <h1 className="leaderboard-title">Leaderboard</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Highscore</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.rank}</td>
                            <td>{entry.username}</td>
                            <td>{entry.highscore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="back-button" onClick={handleBackClick}>Back</button>
            <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
        </div>
    );
}

export default Leaderboard;