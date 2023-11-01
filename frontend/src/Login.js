// path : frontend/src/login.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // App.css import

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      alert('Logged in successfully');
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      <form onSubmit={handleSubmit}>
        <input className="login-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" type="submit">Login</button>
      </form>

      <a className="login-register-link" href="/auth/register">회원가입</a>
      <a className="login-id-find-link" href="/auth/find-id">아이디 찾기</a>
      <a className="login-forgot-password-link" href="/auth/forgot-password">비밀번호 찾기</a>

    </div>
  );
}

export default Login;
