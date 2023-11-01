// MyInfo.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function MyInfo() {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:3001/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            });
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
        };
        fetchUser();
    }, []);
    
    return (
        <div className="myinfo-container">
        <h1 className="myinfo-title">내 정보</h1>
        <div className="myinfo">
            <div className="myinfo-item">
            <div className="myinfo-item-name">이메일</div>
            <div className="myinfo-item-value">{user.email}</div>
            </div>
            <div className="myinfo-item">
            <div className="myinfo-item-name">이름</div>
            <div className="myinfo-item-value">{user.firstName} {user.lastName}</div>
            </div>
            <div className="myinfo-item">
            <div className="myinfo-item-name">아이디</div>
            <div className="myinfo-item-value">{user.username}</div>
            </div>
        </div>
        </div>
    );
}

export default MyInfo;