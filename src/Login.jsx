
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./assets/styles.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required");
      return;
    }

    try {
      const response = await fetch(
        "https://sale-savvy.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.role === "CUSTOMER") {
          navigate("/customerhome");
        } else if (data.role === "ADMIN") {
          navigate("/admin-dashboard");
        }
      } else {
        setError(data.error || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      setError("Server Error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="heading">Login</h1>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSignIn} className="login-form">
          <div>
            <label htmlFor="username" className="login-label">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="login-label">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p>
          New User? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

