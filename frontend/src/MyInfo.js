// path : frontend/src/MyInfo.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from './features/loginSlice';
import axios from 'axios';
import './App.css';

function MyInfo() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(setLogin(false));
            console.log('토큰 없음');
            navigate('/auth/login', { replace: true });
        } else {
            axios.get('http://localhost:3001/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUser(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.response
                        ? error.response.data.message
                        : '서버와의 연결이 끊어졌습니다.';
                    alert(errorMessage);
                    setLoading(false);
                });
        }
    }, [dispatch, navigate]);



    const goToUpdatePage = () => {
        navigate('/auth/update-info', { replace: true });
    }

    if (loading) {
        return null;
    }


    return (
        <div className="myinfo-container">
            <h1 className="myinfo-title">내 정보</h1>
            <div className="myinfo">
                {user.email && (
                    <div className="myinfo-item">
                        <span className="myinfo-item-name">이메일</span>
                        <span className="myinfo-item-value">{user.email}</span>
                    </div>
                )}
                {user.firstName && user.lastName && (
                    <div className="myinfo-item">
                        <span className="myinfo-item-name">이름</span>
                        <span className="myinfo-item-value">{user.firstName}{user.lastName}</span>
                    </div>
                )}
                {user.username && (
                    <div className="myinfo-item">
                        <span className="myinfo-item-name">아이디</span>
                        <span className="myinfo-item-value">{user.username}</span>
                    </div>
                )}
                <button onClick={goToUpdatePage} className="update-button">정보 변경</button>
            </div>
        </div>
    );
}

export default MyInfo;
