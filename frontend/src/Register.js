import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // toast import
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

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

      // 알림창 대신 toast 메시지 띄우기
      toast.success('회원가입이 완료되었습니다.');

      navigate('/auth/login');
    } catch (err) {
      toast.error(err.response.data); // 알림창 대신 toast 메시지 띄우기
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input className="register-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="register-input" type="password" placeholder="Password" 
                          pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$'
                          title='비밀번호는 최소 8자 이상, 최대 20자 이하여야 하며, 숫자를 포함해야 합니다.' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="register-input" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input className="register-input" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input className="register-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
