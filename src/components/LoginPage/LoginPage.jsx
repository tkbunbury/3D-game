import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext/authContext";
import { useUser } from "../../Contexts/UserContext/userContext";
import { doSignOut } from "../firebase/auth";
import "./LoginPage.css";
import LoginButton from "./LoginButton/LoginButton";
import SignupForm from "./SignupForm/SignupForm";
import LoginForm from "./LoginForm/LoginForm";

function SignUpPage() {
	const { currentUser, setUserLoggedIn, userLoggedIn } = useAuth();
	const { user, users, setUser, setUsers } = useUser();
	const [isCreatingAccount, setIsCreatingAccount] = useState(false);

	const [showSignupForm, setShowSignupForm] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);

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

	const handlePlayClick = () => {
		navigate("/startscreen");
	};

	const handleLeaderboardClick = () => {
		navigate("/leaderboard");
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
				<LoginButton label="Play!" onClick={handlePlayClick} />
			</div>
				{showSignupForm && <SignupForm/>}
				{showLoginForm && <LoginForm/>}
			<button className="leaderboard-button" onClick={handleLeaderboardClick}>Leaderboard</button>
		</div>
	);
}

export default SignUpPage;