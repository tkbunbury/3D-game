import React, { useContext, useState, useEffect, createContext } from "react";
import db from "../../components/firebase/firebase";
import { useAuth } from "../AuthContext/authContext";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

const UserContext = createContext();

export function useUser() {
	return useContext(UserContext);
}

export function UserProvider({ children }) {
	const { currentUser } = useAuth();
	const [user, setUser] = useState({});
	const [users, setUsers] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [currentScore, setCurrentScore] = useState(0)

	useEffect(() => {
		const fetchData = async () => {
			const unsub = onSnapshot(
				query(collection(db, "scores"), orderBy("highscore", "desc")),
				(snapshot) => {
					const usersData = snapshot.docs.map((doc) => doc.data());
					setUsers(usersData);
					if (users && currentUser) {
						const currentUserData = usersData.find(
							(person) => person.email === currentUser.email
						);
						setUser(currentUserData);
					}
					setIsLoading(false);
				}
			);
			return unsub;
		};

		fetchData();
	}, [currentUser]);

	const value = {
		user,
		users,
		setUser,
		setUsers,
		isLoading,
		currentScore,
		setCurrentScore,
	};
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
