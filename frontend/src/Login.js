// path : frontend/src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';  // 리액트 라우터의 Link 컴포넌트 추가
import { useNavigate } from 'react-router-dom';  // useHistory import
import { useDispatch } from 'react-redux';
import { setLogin } from './features/loginSlice'; // 리덕스 액션 가져오기

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // 에러 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();  // useHistory 초기화
  const dispatch = useDispatch(); // useDispatch 초기화

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      dispatch(setLogin(true));
      navigate('/', { replace: true });
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : '로그인 중 문제가 발생했습니다.';
      setError(errorMessage);
    }

    setIsLoading(false); // 로딩 상태 관리는 유지
  };

  return (
    <div className="login-container">
      <h1 className="login-title">로그인</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit" disabled={isLoading}>
          로그인
        </button>
      </form>
      <div className='link-group'>
        <Link className="login-register-link" to="/auth/register">회원가입</Link>
        <Link className="login-id-find-link" to="/auth/find-id">아이디 찾기</Link>
        <Link className="login-forgot-password-link" to="/auth/forgot-password">비밀번호 찾기</Link>
      </div>
    </div>
  );
}

export default Login;