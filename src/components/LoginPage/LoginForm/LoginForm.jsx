import { useState } from "react";
import "./LoginForm.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../../Contexts/AuthContext/authContext";
import { Navigate, useNavigate } from "react-router-dom";

function LoginForm({ onSubmit }) {
	const navigate = useNavigate();
	const { userLoggedIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		await signInWithEmailAndPassword(auth, email, password);
		navigate("/");
	};

	return (
		<>
			<form className="login-form" onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
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
		</>
	);
}

export default LoginForm;
