import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext/authContext.jsx";
import { UserProvider } from "./Contexts/UserContext/userContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</AuthProvider>
	</BrowserRouter>
);
