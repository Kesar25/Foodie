import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the custom CSS file

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    try {
      const response = await fetch('http://localhost:5000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate("/");
      } else {
        alert("Enter valid credentials");
        console.log("Login failed: ", json.error);
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card card p-4 shadow-lg">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
            <Link to="/signup" className="btn btn-secondary btn-block mt-2">Don't have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
