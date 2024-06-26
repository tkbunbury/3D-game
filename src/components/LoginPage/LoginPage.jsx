import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/authContext";
import { useUser } from "../../Contexts/UserContext/userContext";
import { doSignOut } from "../firebase/auth";
import "./LoginPage.css";
import LoginButton from "./LoginButton/LoginButton";
import SignupForm from "./SignupForm/SignupForm";
import LoginForm from "./LoginForm/LoginForm";

function LoginPage() {
  const { setUserLoggedIn, userLoggedIn } = useAuth();
  const { user, users, setUser, isLoading } = useUser();
  
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [topThreePlayersData, setTopThreePlayersData] = useState([]);
  const [playersPosition, setPlayersPosition] = useState();
  const [contendersData, setContendersData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (users && users.length > 0) {
        setTopThreePlayersData([
          { rank: 1, username: users[0].username, highscore: users[0].highscore },
          { rank: 2, username: users[1].username, highscore: users[1].highscore },
          { rank: 3, username: users[2].username, highscore: users[2].highscore },
        ]);
      }
      
      if (!isLoading && user && user.username) {
        const tempUserPosition = users.findIndex((person) => person.username === user.username) + 1;
        setPlayersPosition(tempUserPosition);
        if (user.username && users.length >= tempUserPosition) {
          if(tempUserPosition === 1){
			setContendersData([
				{ rank: tempUserPosition, username: users[tempUserPosition - 1].username, highscore: users[tempUserPosition - 1].highscore },
				{ rank: tempUserPosition + 1, username: users[tempUserPosition].username, highscore: users[tempUserPosition].highscore },
				{ rank: tempUserPosition + 2, username: users[tempUserPosition +1].username, highscore: users[tempUserPosition +1].highscore },
			  ]);
		  }
			else {setContendersData([
            { rank: tempUserPosition - 1, username: users[tempUserPosition - 2].username, highscore: users[tempUserPosition - 2].highscore },
            { rank: tempUserPosition, username: users[tempUserPosition - 1].username, highscore: users[tempUserPosition - 1].highscore },
            { rank: tempUserPosition + 1, username: users[tempUserPosition].username, highscore: users[tempUserPosition].highscore },
          ])};
        }
      }
    }
    fetchData();
  }, [users, user, isLoading]);

	const handlePlayClick = () => {
		navigate("/startscreen");
	};

  const handleNewUserClick = () => {
    setShowSignupForm(true);
    setShowLoginForm(false);
  };

  const handleLoginClick = () => {
    setShowSignupForm(false);
    setShowLoginForm(true);
  };

  const handleGuestClick = () => {
    navigate("/startscreen");
  };

  const handleLeaderboardClick = () => {
    navigate("/leaderboard");
  };

  const handleSignOutClick = () => {
    doSignOut(setUser, setUserLoggedIn);
  };

  	return isLoading ? <p>Loading...</p> : user.username ? (
		<div className="login-page">
			<div className="button-container">
				<LoginButton label="New User" onClick={handleNewUserClick} />
				<LoginButton
					label={userLoggedIn ? "Sign Out" : "Sign In"}
					onClick={userLoggedIn ? handleSignOutClick : handleLoginClick}
				/>
				<LoginButton label="Play!" onClick={handleGuestClick} />
			</div>
				{showSignupForm && <SignupForm/>}
				{showLoginForm && <LoginForm/>}
			<h2>Top 3 Scores</h2>
			<table className="leaderboard-table">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Username</th>
						<th>Highscore</th>
					</tr>
				</thead>
				<tbody>
					{topThreePlayersData.map((entry, index) => (
						<tr key={index} className={user.username === entry.username ? "bold" : null}>
							<td>{entry.rank}</td>
							<td>{entry.username}</td>
							<td>{entry.highscore}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2 hidden={!userLoggedIn}>Your Contenders</h2>
			<table className="leaderboard-table">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Username</th>
						<th>Highscore</th>
					</tr>
				</thead>
				<tbody>
					{contendersData.map((entry, index) => (
						<tr key={index} className={user.username === entry.username ? "bold" : ""}>
							<td>{entry.rank}</td>
							<td>{entry.username}</td>
							<td>{entry.highscore}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className="leaderboard-button" onClick={handleLeaderboardClick}>Leaderboard</button>
			
		</div>
	) : (
		<div className="login-page">
			<div className="button-container">
				<LoginButton label="New User" onClick={handleNewUserClick} />
				<LoginButton
					label={userLoggedIn ? "Sign Out" : "Sign In"}
					onClick={userLoggedIn ? handleSignOutClick : handleLoginClick}
				/>
				<LoginButton label="Play!" onClick={handlePlayClick} />
			</div>
				{showSignupForm && <SignupForm/>}
				{showLoginForm && <LoginForm/>}
			<h2>Top 3 Scores</h2>
			<table className="leaderboard-table">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Username</th>
						<th>Highscore</th>
					</tr>
				</thead>
				<tbody>
					{topThreePlayersData.map((entry, index) => (
						<tr key={index} className={user.username === entry.username ? "bold" : null}>
							<td>{entry.rank}</td>
							<td>{entry.username}</td>
							<td>{entry.highscore}</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className="leaderboard-button" onClick={handleLeaderboardClick}>Leaderboard</button>
		</div>
	)
}

export default LoginPage;