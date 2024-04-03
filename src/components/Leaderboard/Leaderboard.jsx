import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/authContext";
import { useUser } from "../../Contexts/UserContext/userContext";

function Leaderboard() {
  const { currentUser } = useAuth();
  const { user, users, isLoading } = useUser();
  const [leaderBoard, setLeaderBoard] = useState([])

  useEffect(() => {
	if(!isLoading){
		setLeaderBoard(users.slice(0, 10).map((userData, index) => ({
			rank: index + 1,
			username: userData.username,
			highscore: userData.highscore,
		  })))
	}
  }, [users])

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
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
          {leaderBoard.map((entry, index) => (
            <tr key={index} className={user.username === entry.username ? "bold" : ""}>
              <td>{entry.rank}</td>
              <td>{entry.username}</td>
              <td>{entry.highscore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
    </div>
  );
}

export default Leaderboard;