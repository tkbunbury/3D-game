import { useState } from "react";
import './SignupForm.css'

function SignupForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please retype.');
            return;
        }
        onSubmit(username, password);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    };

    return (
    <form className="login-form" onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        />
        <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Account</button>
    </form>
    );
}

export default SignupForm;

