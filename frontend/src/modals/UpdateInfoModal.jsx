// UpdateInfoModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './Modal.css'; // 모달에 대한 스타일을 추가하세요

function UpdateInfoModal({ isOpen, onClose, refreshUser }) {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        formEmpty: null
    });

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        // 이메일 유효성 검사
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = '올바른 이메일 형식이 아닙니다.';
            isValid = false;
        }

        // 비밀번호 유효성 검사 (예: 최소 8자, 하나 이상의 숫자 포함)
        if (formData.password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(formData.password)) {
            errors.password = '비밀번호는 최소 8자 이상, 최대 20자 이하여야 하며, 숫자를 포함해야 합니다.';
            isValid = false;
        }

        setErrors(errors); // 오류 상태 업데이트
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email && !formData.firstName && !formData.lastName && !formData.password) {
            setErrors({ ...errors, formEmpty: '변경할 정보를 최소 한 항목 이상 입력해주세요.' });
            return;
        }

        if (!validateForm()) {
            return; // 유효성 검사 실패 시, 제출 중단
        }
        try {
            const res = await axios.put('http://localhost:3001/auth/update-info', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(res.data);
            alert('정보가 업데이트 되었습니다.');
            refreshUser(); // 사용자 정보를 새로고침하는 함수를 호출
            onClose(); // 모달 닫기
        } catch (err) {
            console.error(err);
            alert('정보를 업데이트하는데 실패했습니다.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1>회원 정보 변경</h1>
                <form onSubmit={handleSubmit} >
                    <div className='form-group'>
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">이름</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">성</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$'
                            title='비밀번호는 최소 8자 이상, 최대 20자 이하여야 하며, 숫자를 포함해야 합니다.'
                        />
                    </div>
                    {
                        errors.formEmpty
                            ? <div className="form-error-message">* {errors.formEmpty}</div>
                            : <p className='form-message'>* 빈칸이면 변경되지 않습니다.</p>
                    }
                    <div className="modal-buttons">
                        <button type="button" className="cancel-button" onClick={onClose}>취소</button>
                        <button type="submit" className="save-button">저장</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateInfoModal;
