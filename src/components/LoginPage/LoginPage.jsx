import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/authContext";
import { useUser } from "../../Contexts/UserContext/userContext";
import { doSignOut } from "../firebase/auth";
import "./LoginPage.css";
import LoginButton from "./LoginButton/LoginButton";
import SignupForm from "./SignupForm/SignupForm"
import LoginForm from "./LoginForm/LoginForm";

function SignUpPage({ isCreatingAccount, setIsCreatingAccount }) {
	const { currentUser, setUserLoggedIn, userLoggedIn } = useAuth();
	const { user, users, setUser, setUsers } = useUser();

	const [showSignupForm, setShowSignupForm] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleNewUserClick = () => {
		setShowSignupForm(true);
		setShowLoginForm(false);
		setIsCreatingAccount(true);
	};

	const handleLoginClick = () => {
		setShowSignupForm(false);
		setShowLoginForm(true);
		setIsCreatingAccount(false);
	};

	const handleGuestClick = () => {
		navigate("/startscreen/Guest");
	};

	const handleLeaderboardClick = () => {
		navigate("/leaderboard");
	};

	const handleNewUserSubmit = (username, password) => {
		console.log("Form submitted. Username:", username, "Password:", password);
		console.log("Creating new user:", username, password);
		setUsername(username);
		navigate(`/startscreen/${username}`);
	};

	const handleLoginSubmit = (username, password) => {
		console.log("Form submitted. Username:", username, "Password:", password);
		console.log("Logging in:", username, password);
		setUsername(username);
		navigate(`/startscreen/${username}`);
	};

	const handleSignOutClick = () => {
		doSignOut();
		setUser({});
		setUserLoggedIn(false);
	};

	return (
		<div className="login-page">
			<div className="button-container">
				<LoginButton label="New User" onClick={handleNewUserClick} />
				<LoginButton
					label={userLoggedIn ? "Sign Out" : "Sign In"}
					onClick={userLoggedIn ? handleSignOutClick : handleLoginClick}
				/>
				<LoginButton label="Play as Guest" onClick={handleGuestClick} />
			</div>
			{showSignupForm && <SignupForm onSubmit={handleNewUserSubmit} />}
			{showLoginForm && <LoginForm onSubmit={handleLoginSubmit} />}
			<button className="leaderboard-button" onClick={handleLeaderboardClick}>
				Go to Leaderboard
			</button>
		</div>
	);
}

export default SignUpPage;