import { auth } from "./firebase.js";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = (setUser, setUserLoggedIn) => {
	setUser({})
	setUserLoggedIn(false)
	return auth.signOut();
};
