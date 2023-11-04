// UpdateInfo.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 이곳에 PUT 또는 PATCH 요청을 보낼 서버의 엔드포인트를 넣으세요.
      const res = await axios.put('http://localhost:3001/auth/update-info', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(res.data);
      alert('정보가 업데이트 되었습니다.');
      navigate('/profile'); // 사용자 정보 페이지로 리디렉트
    } catch (err) {
      console.error(err);
      alert('정보를 업데이트하는데 실패했습니다.');
    }
  };

  return (
    <div className="update-info-container">
      <h1>회원 정보 변경</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이메일:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            이름:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            성:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            비밀번호:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">정보 변경</button>
      </form>
    </div>
  );
}

export default UpdateInfo;
