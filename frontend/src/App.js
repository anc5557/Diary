// path: frontend/src/App.js 
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './features/loginSlice';
import { ToastContainer } from 'react-toastify';


import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './NavBar';
import About from './pages/About';
import Calendar from './pages/Calendar';
import MyInfo from './pages/MyInfo';
import WriteDiary from './pages/WriteDiary';
import Footer from './Footer';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(setLogin(!!token));
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    // 로딩 중에는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/" element={isLoggedIn ? <Calendar /> : <About />} />
          <Route
            path="/auth/profile"
            element={isLoggedIn ? <MyInfo /> : <Navigate replace to="/auth/login" />}
          />
          <Route path="/diary/write" element={isLoggedIn ? <WriteDiary /> : <Navigate replace to="/auth/login" />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
}

export default App;