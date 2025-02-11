import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  database,
} from "../Register/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import loginImage from "./login.png";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const formattedUserData = {
          username: userData.username || "User",
          email: user.email,
          uid: user.uid,
          userType: userData.userType || "user",
        };

        sessionStorage.setItem("user", JSON.stringify(formattedUserData));
        navigate("/");
      } else {
        setError("User data not found.");
      }
    } catch (error) {
      setError("Invalid email or password.");
      console.error("Error during login:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      let userData;

      if (!snapshot.exists()) {
        userData = {
          username: user.displayName || "User",
          email: user.email,
          uid: user.uid,
          userType: "user",
        };
        await set(userRef, userData);
      } else {
        userData = snapshot.val();
      }

      const formattedUserData = {
        username: userData.username || "User",
        email: user.email,
        uid: user.uid,
        userType: userData.userType || "user",
      };

      sessionStorage.setItem("user", JSON.stringify(formattedUserData));
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Failed to sign in with Google.");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Enter Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Enter Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember Me
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>

        <div className="google-signin-container">
          <span>Or sign in with</span>
          <div className="google-signin" onClick={handleGoogleSignIn}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google-logo"
            />
          </div>
        </div>
        <p>
          Don't have an account?{" "}
          <a className="signUp" href="/register">
            Create One
          </a>
        </p>
      </div>
      <div className="image-container">
        <img src={loginImage} alt="Login" />
      </div>
    </div>
  );
}

export default Login;
