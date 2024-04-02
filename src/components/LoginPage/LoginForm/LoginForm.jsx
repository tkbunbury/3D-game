import { useState } from "react";
import "./LoginForm.css";
import { useAuth } from "../../../Contexts/AuthContext/authContext";
import { useUser } from "../../../Contexts/UserContext/userContext";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";

function LoginForm({ onSubmit }) {
  const { userLoggedIn } = useAuth();
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorSigningIn, setErrorSigningIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
	setErrorSigningIn(false)
    try {
      await doSignInWithEmailAndPassword(email, password);
      setErrorSigningIn(false);
	  setEmail("");
	  setPassword("");
    } catch(error){
      if (error) {
        setErrorSigningIn(true);
        console.log(error);
        setEmail("");
        setPassword("");
      }
    }
  };

  return userLoggedIn ? <p>Sign in successful, hello {user.username}!</p> :  (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
		{errorSigningIn && <p>Please can you check your email and password and try again</p>}
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
