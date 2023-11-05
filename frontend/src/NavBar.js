// src/NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './features/loginSlice'; // 로그인 상태를 변경하는 액션 가져오기
import './App.css';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 리덕스 스토어의 isLoggedIn 상태를 구독
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('token');
    // 리덕스 스토어의 로그인 상태 업데이트
    dispatch(setLogin(false));
    // 홈으로 리다이렉트
    navigate('/');
  };

  return (
    <div className="navbar">
        <Link className="navbar-link" to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link className="navbar-link" to="/auth/profile">My Info</Link>
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
