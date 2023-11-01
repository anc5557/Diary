import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NavBar from './NavBar';
import About from './About';
import Calendar from './Calendar';
import MyInfo from './MyInfo';
import './App.css';

function App() {
  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/auth/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/auth/register" element={<Register />} />
          {isLoggedIn ? (
            <Route path="/" element={<Calendar />} /> // 로그인 상태일 때는 Calendar 컴포넌트를 렌더
          ) : (
            <Route path="/" element={<About />} /> // 로그아웃 상태일 때는 About 컴포넌트를 렌더
          )}
          <Route path="/auth/me" element={<MyInfo />} />
          {/* 다른 라우트들 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
