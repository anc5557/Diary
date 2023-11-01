// path: frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UpdateProfile from './UpdateProfile';

// 라우팅 설정 
// auth/register : 회원가입 페이지
// auth/login : 로그인 페이지
// auth/update-profile : 회원 정보 변경 페이지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/update-profile" element={<UpdateProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
