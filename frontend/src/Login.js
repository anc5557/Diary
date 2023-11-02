// path : frontend/src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';  // 리액트 라우터의 Link 컴포넌트 추가
import { useNavigate } from 'react-router-dom';  // useHistory import

function Login({setIsLoggedIn}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);  // 에러 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();  // useHistory 초기화

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/auth/login', 
                                        { username, password }, 
                                        { headers: { 'Content-Type': 'application/json' } }); // 요청 헤더에 Content-Type을 추가
      localStorage.setItem('token', response.data.token); // 로컬 스토리지에 토큰 저장
      setIsLoggedIn(true); // 로그인 상태를 true로 변경
      navigate('/', { replace: true });
       // 홈으로 이동
    } catch (err) {
      const errorMessage = err.response 
                           ? err.response.data.message 
                           : '로그인 중 문제가 발생했습니다.'; // 서버 응답이 없는 경우 대비
      setError(errorMessage);
    }

    setIsLoading(false); // 로딩 상태 해제는 try/catch 바깥에서 수행
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
