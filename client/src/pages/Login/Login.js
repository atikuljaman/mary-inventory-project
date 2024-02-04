import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Login = ({ setLoggedIn }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/users/login', { email, password })
            localStorage.setItem('user_id', response.data.data._id)
            setLoggedIn(true)
            navigate('/dashboard')

        } catch (error) {

            alert('Invalid Credentials')
        }

        // code to submit login form
    };

    return (
       
       

        <div className="login-page">
            <h1 className="login-heading">Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="login-label">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="login-input"
                    />
                </label>
                <label className="login-label">
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        className="login-input"
                    />
                </label>
                <button type="submit" className="login-button">Login</button>
            </form>
            <p className="login-signup-link">Don't have an account? <Link to="/register">Sign up here</Link></p>
           
        </div>
   
    );
};

export default Login;
