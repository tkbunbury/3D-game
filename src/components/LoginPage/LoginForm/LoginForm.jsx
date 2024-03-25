import { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(username, password);
        setUsername('');
        setPassword('');
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
        <button type="submit">Login</button>
    </form>
    );
}

export default LoginForm;