// src/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('token');
    // 로그인 상태 업데이트
    setIsLoggedIn(false);
    // 홈으로 리다이렉트
    navigate('/');
  };

  return (
    <div className="navbar">
        <Link className="navbar-link" to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link className="navbar-link" to="/auth/me">My Info</Link>
          <button className="navbar-link" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link className="navbar-link" to="/auth/register">Register</Link>
          <Link className="navbar-link" to="/auth/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default NavBar;
