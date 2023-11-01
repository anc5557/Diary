import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';  // 리액트 라우터의 Link 컴포넌트 추가

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // 에러 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:3001/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      alert('Logged in successfully');
      setIsLoading(false);
    } catch (err) {
      setError(err.response.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      {error && <div className="error-message">{error}</div>} {/* 에러 메시지 출력 */}
      <form onSubmit={handleSubmit}>
        <input className="login-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" type="submit" disabled={isLoading}>Login</button> {/* 로딩 상태에 따라 버튼 비활성화 */}
      </form>
      <Link className="login-register-link" to="/auth/register">회원가입</Link>
      <Link className="login-id-find-link" to="/auth/find-id">아이디 찾기</Link>
      <Link className="login-forgot-password-link" to="/auth/forgot-password">비밀번호 찾기</Link>
    </div>
  );
}

export default Login;
