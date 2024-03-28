import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.VITE_APP_FIREBASE_KEY,
	authDomain: process.env.VITE_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.VITE_APP_FIREBASE_DATABASE,
	projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VITE_APP_FIREBASE_SENDER_ID,
	appId: process.env.VITE_APP_MESSAGING_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth };
export default db;