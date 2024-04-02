import { useState } from "react";
import './SignupForm.css'
import { useAuth } from "../../../Contexts/AuthContext/authContext";
import { auth } from "../../firebase/firebase";
import db from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


function SignupForm({ onSubmit }) {
    const { userLoggedIn } = useAuth()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please retype.');
            return;
        }  
    createUserWithEmailAndPassword(auth, email, password);
		const userRef = await doc(db, "scores", email);
		setDoc(userRef, {
			highscore: 0,
			username: username,
			email: email,
		});
        
    };

    return (
    <form className="login-form" onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        />
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

