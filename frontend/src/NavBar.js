// src/NavBar.js

import { Link } from 'react-router-dom';
import './App.css';

function NavBar({ isLoggedIn }) {
  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          <Link className="navbar-link" to="/auth/me">My Info</Link>
          <Link className="navbar-link" to="/auth/logout">Logout</Link>
        </>
      ) : (
        <>
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/auth/login">Login</Link>
        <Link className="navbar-link" to="/auth/register">Register</Link>
        </>
        

      )}
    </div>
  );
}

export default NavBar;