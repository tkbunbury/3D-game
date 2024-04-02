import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../../Contexts/AuthContext"

const SignIn = () => {
	const { userLoggedIn } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isSigningIn) {
			setIsSigningIn(true);
			await doSignInWithEmailAndPassword(email, password);
		}
	};

	return (
		<>
			{userLoggedIn && <Navigate to={"/"} replace={true} />}
			<h1>Test Sign In User Form</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="email"> Email Address: </label>
				<input
					className="email"
					type="email"
					autoComplete="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<label htmlFor=""> Password: </label>
				<input
					type="password"
					autoComplete="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<button type="submit">Sign In</button>
			</form>
		</>
	);
};

export default SignIn;
