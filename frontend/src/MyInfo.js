import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function MyInfo() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:3001/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    // 정보 변경 페이지로 이동하는 함수
    const goToUpdatePage = () => {
        navigate('/auth/update-info'); 
    };

    return (
        <div className="myinfo-container">
            <h1 className="myinfo-title">내 정보</h1>
            <div className="myinfo">
                <div className="myinfo-item">
                    <span className="myinfo-item-name">이메일</span>
                    <span className="myinfo-item-value">{user.email}</span>
                </div>
                <div className="myinfo-item">
                    <span className="myinfo-item-name">이름</span>
                    <span className="myinfo-item-value">{user.firstName}{user.lastName}</span>
                </div>
                <div className="myinfo-item">
                    <span className="myinfo-item-name">아이디</span>
                    <span className="myinfo-item-value">{user.username}</span>
                </div>
                <button onClick={goToUpdatePage} className="update-button">정보 변경</button>
            </div>
        </div>
    );
}

export default MyInfo;
