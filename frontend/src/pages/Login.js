import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../api/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/api/login`, { email, password });

            localStorage.setItem("token", res.data.token);
            navigate("/employees");
        } catch (err) {
            setError("Invalid email or password");
        }
    };
    return (
    <div className="container">
        <h2>Login</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>

        <p style={{marginTop: "10px"}}>Don't have an account? <Link to="/Signup">Signup</Link></p>
    </div>
    );
}

export default Login;