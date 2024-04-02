import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth } from "../../components/firebase/firebase";
import db from "../../components/firebase/firebase";
import { useAuth } from "../../Contexts/AuthContext/authContext";

const Register = () => {
	const { userLoggedIn } = useAuth();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password);
		const userRef = await doc(db, "scores", email);
		setDoc(userRef, {
			highscore: 0,
			username: username,
			email: email,
		});
	};

	return (
		<>
			{userLoggedIn && <Navigate to={"/"} replace={true} />}
			<h1>Test Register User Form</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor="user">Username: </label>
				<input
					className="user"
					type="text"
					autoComplete="username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<label htmlFor="email"> Email Address: </label>
				<input
					className="email"
					type="email"
					autoComplete="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<label htmlFor=""> Password: </label>
				<input
					type="password"
					autoComplete="new-password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<label htmlFor=""> Confirm Password: </label>
				<input
					type="password"
					autoComplete="new-password"
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
				/>
				<button>Register</button>
			</form>
		</>
	);
};

export default Register;
