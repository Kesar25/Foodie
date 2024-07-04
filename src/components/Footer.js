import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-2">
      <div className="container text-center">
        <h5 className="mb-2">Foodie</h5>
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link to="/" className="text-white">Home</Link>
          </li>
        </ul>
        <div className="mt-2">
          <p>&copy; 2024 Foodie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
