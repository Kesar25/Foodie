import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Import the custom CSS file

const Register = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, location } = credentials;

    try {
      const response = await fetch('http://localhost:5000/api/v1/user/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, location })
      });

      const json = await response.json();

      if (json.success) {
        console.log(json);
        navigate("/");
      } else {
        alert("Enter valid credentials");
        console.log("Registration failed: ", json.error);
      }
    } catch (error) {
      console.error("Error during registration: ", error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card card p-4 shadow-lg">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" value={credentials.name} onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={credentials.email} onChange={onChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input type="text" className="form-control" id="location" placeholder="Enter location" name="location" value={credentials.location} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
            <Link to="/login" className="btn btn-secondary btn-block mt-2">Already a user</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
