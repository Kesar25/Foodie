import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Foodie</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/"><FaHome className="me-1" />Home</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
              <Link className="nav-link" to="/profile"><FaUser className="me-1" />My Profile</Link>
            </li>
          </ul>
          <div className='d-flex'>
            {!localStorage.getItem('token') ? (
              <>
                <Link className="btn btn-custom" to="/login" role="button">Login</Link>
                <Link className="btn btn-custom" to="/signup" role="button">Sign Up</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-custom cart-icon" to="/cart" role="button">
                  <FaShoppingCart />
                </Link>
                <button className="btn btn-custom" onClick={handleLogOut}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
