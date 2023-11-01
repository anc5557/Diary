// 캘린더 페이지

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Calendar() {
    const [diaries, setDiaries] = useState([]);
    
    useEffect(() => {
        const fetchDiaries = async () => {
        try {
            const res = await axios.get("http://localhost:3001/diaries");
            setDiaries(res.data);
        } catch (err) {
            console.log(err);
        }
        };
        fetchDiaries();
    }, []);
    
    return (
        <div className="calendar-container">
        <h1 className="calendar-title">사진 일기</h1>
        <div className="calendar">
            {diaries.map((diary) => (
            <div className="calendar-diary" key={diary.id}>
                <img className="calendar-img" src={diary.img} alt="diary-img" />
                <div className="calendar-date">{diary.date}</div>
                <div className="calendar-content">{diary.content}</div>
            </div>
            ))}
        </div>
        </div>
    );
    }

export default Calendar;