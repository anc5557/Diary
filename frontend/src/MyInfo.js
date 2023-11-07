// path : frontend/src/MyInfo.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from './features/loginSlice';

import UpdateInfoModal from './UpdateInfoModal';
import axios from 'axios';
import './App.css';

function MyInfo() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

     // 모달을 여는 함수
     const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달을 닫는 함수
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 사용자 정보를 새로고침하는 함수
    const refreshUser = () => {
        // 여기에 사용자 정보를 새로고침하는 로직을 추가하세요.
        const token = localStorage.getItem('token');
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
    };


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

    // 회원 탈퇴 처리 함수
    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm('정말로 회원 탈퇴를 하시겠습니까?');
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            axios.delete('http://localhost:3001/auth/delete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(() => {
                    alert('회원 탈퇴 처리가 완료되었습니다.');
                    dispatch(setLogin(false));
                    localStorage.removeItem('token'); // 토큰 삭제
                    navigate('/'); // 홈으로 이동
                })
                .catch((error) => {
                    const errorMessage = error.response
                        ? error.response.data.message
                        : '서버와의 연결이 끊어졌습니다.';
                    alert(errorMessage);
                });
        }
    };



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
                {user.email && (
                    <div className="myinfo-item">
                        <span className="myinfo-item-name">이메일</span>
                        <span className="myinfo-item-value">{user.email}</span>
                    </div>
                )}
                <div className="myinfo-actions">
                    <button onClick={openModal} className="update-button">정보 변경</button>
                    <UpdateInfoModal isOpen={isModalOpen} onClose={closeModal} refreshUser={refreshUser} />
                    <button onClick={handleDeleteAccount} className="delete-button">회원 탈퇴</button>
                </div>
            </div>
        </div>
    );
}

export default MyInfo;
