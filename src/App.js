import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "../src/screens/Home.js";
import Login from "../src/screens/Login.js";
import Signup from "../src/screens/Signup.js";
import MyProfile from "../src/screens/MyProfile.js";
import { CartProvider } from './components/ContextReducer';

function App() {
  return (
    <div>
      <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/profile" element={<MyProfile/>}></Route>
        </Routes>
      </Router>
      </CartProvider>
        
    </div>
  );
}

export default App;
