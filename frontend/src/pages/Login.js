import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making requests to Django back end
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook to redirect users

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      // If login is successful, store the token
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // Redirect to Home.js after successful login
      navigate("/home");
    } catch (err) {
      setError("Login failed. Check your credentials and try again.");
    }
  };

  return (
    <Container> 
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <Button type="submit">Login </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </Container>
  );
}

export default Login;
