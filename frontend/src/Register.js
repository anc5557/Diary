import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // useNavigate import
import './App.css';  // App.css import

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();  // useHistory 초기화

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post('http://localhost:3001/auth/register', { 
            username,
            password,
            firstName,
            lastName,
            email,
        });
      
      // 알림창 띄우기
      alert('회원가입이 성공적으로 완료되었습니다.');
      
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/auth/login');
    

    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="register-container">  {/* 컨테이너 스타일 적용 */}
      <form onSubmit={handleSubmit}>
        <input className="register-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="register-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="register-input" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input className="register-input" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input className="register-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="register-button" type="submit">Register</button>  {/* 버튼 스타일 적용 */}
      </form>
    </div>
  );
}

export default Register;
