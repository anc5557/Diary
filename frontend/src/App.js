import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NavBar from './NavBar';
import About from './About';
import Calendar from './Calendar';
import MyInfo from './MyInfo';
import UpdateInfo from './UpdateInfo';
import './App.css';

function App() {
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 마운트 될 때 로컬 스토리지의 토큰을 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있다면 로그인 상태로 설정
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/auth/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/" element={isLoggedIn ? <Calendar /> : <About />} />
          <Route 
            path="/auth/profile" 
            element={isLoggedIn ? <MyInfo /> : <Navigate replace to="/auth/login" />} 
          />
          <Route 
            path="/auth/update-info" 
            element={isLoggedIn ? <UpdateInfo /> : <Navigate replace to="/auth/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
