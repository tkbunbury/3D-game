import React from "react";
import "./Leaderboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/authContext";
import { useUser } from "../../Contexts/UserContext/userContext";

function Leaderboard() {
	const { currentUser } = useAuth();
	const { user, users, isLoading } = useUser();

	const leaderboardData = [
		{ rank: 1, username: users[0].username, highscore: users[0].highscore },
		{ rank: 2, username: users[1].username, highscore: users[1].highscore },
		{ rank: 3, username: users[2].username, highscore: users[2].highscore },
	];

	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

	const handleLogoutClick = () => {
		// We need to add Logic to logout the user and clear user data from local storage)
		navigate("/");
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
			<button className="logout-button" onClick={handleLogoutClick}>
				Logout
			</button>
		</div>
	);
}

export default Leaderboard;
