// path : frontend/src/Calendar.js
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import ReactCalendar from 'react-calendar';
import DiaryModal from "./DiaryModal";

import 'react-calendar/dist/Calendar.css';
import './custom-react-calendar.css';

import "./App.css";

function Calendar() {
    const [diaries, setDiaries] = useState([]); // diaries 상태 추가(초기값은 빈 배열),     
    const [date, setDate] = useState(new Date()); // date 상태 추가(초기값은 오늘 날짜)
    const [showForm, setShowForm] = useState(false); // showForm 상태 추가(초기값은 false)
    const [diaryData, setDiaryData] = useState(null); // 서버로부터 가져온 일기 데이터 상태

    const handleCloseModal = () => {
        setShowForm(false);
    };

    // 캘린더 렌더링 시, 서버에서 일기, 날짜 정보를 가져옵니다.
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        axios.get('http://localhost:3001/diary/dates', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                // 서버로부터 받아온 날짜 데이터로 marks를 업데이트합니다.
                const fetchedMarks = response.data.map(date => moment(date).format("DD-MM-YYYY"));
                setDiaries(fetchedMarks);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDateClick = async (value) => {
        // 클릭한 날짜를 포맷에 맞게 변환
        const formattedDate = moment(value).format("YYYY-MM-DD");

        try {
            // 서버에 해당 날짜의 일기 데이터를 요청
            const response = await axios.get(`http://localhost:3001/diary/${formattedDate}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // 가져온 데이터를 diaryData 상태에 저장
            setDiaryData(response.data);
            setShowForm(true); // 모달을 표시
        } catch (error) {
            console.error('Error fetching diary entry:', error);
            setDiaryData(null); // 에러가 발생했을 때 데이터 초기화
            setShowForm(false); // 모달을 표시하지 않음
        }
    };




    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <div className="diary-title-container">
                    <h1>다이어리</h1>
                </div>
                <div className="add-button-container">
                    <Link className="calendarwrite-link" to="/diary/write">
                        <div className="add-button">+</div>
                    </Link>
                </div>
            </div>
            <ReactCalendar
                onChange={handleDateClick} value={date}  // onChange와 value props 추가 
                // calendarType prop 추가
                calendarType="gregory"
                showNeighboringMonth={false}
                tileContent={({ date, view }) => {
                    // diaries 상태를 참조하여 날짜에 점을 찍습니다.
                    if (diaries.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
                        return <div className="dot"></div>;
                    }
                }}

                formatDay={(locale, date) => moment(date).format("DD")}

            />
            <DiaryModal
                show={showForm}
                onClose={handleCloseModal}
                diaryData={diaryData} // 서버로부터 가져온 일기 데이터를 모달에 전달
            />


        </div>
    );
}

export default Calendar;