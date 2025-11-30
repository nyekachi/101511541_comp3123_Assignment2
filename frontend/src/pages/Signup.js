import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../api/config';

function Signup() {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    await axios.post(`${API_URL}/api/auth/signup`, {
        name,
        email,
        password
    });

    navigate("/login");
    };

    return (
    <div className="container">
        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Full-Name"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
            />

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

            <button type="submit">Create Account</button>
        </form>

        <p style={{marginTop: "10px"}}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
    );
}

export default Signup;