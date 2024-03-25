import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'
import LoginButton from './LoginButton/LoginButton';
import SignupForm from './SignupForm/SignupForm';
import LoginForm from './LoginForm/LoginForm';

function LoginPage() {
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const navigate = useNavigate();

    const handleNewUserClick = () => {
        setShowSignupForm(true);
        setShowLoginForm(false);
    };

    const handleLoginClick = () => {
        setShowSignupForm(false);
        setShowLoginForm(true);
    };

    const handleGuestClick = () => {
        navigate('/startscreen'); 
    };

    const handleLeaderboardClick = () => {
        navigate('/leaderboard');
    };

    const handleNewUserSubmit = (username, password) => {
        console.log("Form submitted. Username:", username, "Password:", password);
        console.log('Creating new user:', username, password);
    };

    const handleLoginSubmit = (username, password) => {
        console.log("Form submitted. Username:", username, "Password:", password);
        console.log('Logging in:', username, password);

    };

    return (
    <div className="login-page">
        <div className="button-container">
            <LoginButton label="New User" onClick={handleNewUserClick} />
            <LoginButton label="Login" onClick={handleLoginClick} />
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

export default LoginPage;