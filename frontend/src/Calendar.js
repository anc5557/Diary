// path : frontend/src/Calendar.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactCalendar from 'react-calendar';
import DiaryModal from "./DiaryModal";
import 'react-calendar/dist/Calendar.css';
import './custom-react-calendar.css';

import "./App.css";

function Calendar() {
    const [diaries, setDiaries] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showForm, setShowForm] = useState(false);
    const [diaryContent, setDiaryContent] = useState("");
    const [diaryImage, setDiaryImage] = useState(null);

    const handleCloseModal = () => {
        setShowForm(false);
    };

    const handleModalSubmit = async () => {
        const formData = new FormData();
        formData.append('date', date.toISOString().substring(0, 10));
        formData.append('content', diaryContent);
        if (diaryImage) {
            formData.append('image', diaryImage);
        }

        try {
            const res = await axios.post("http://localhost:3001/diaries", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDiaries([...diaries, res.data]);
            setShowForm(false);
            setDiaryContent("");
            setDiaryImage(null);
        } catch (err) {
            console.log(err);
        }
    };

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

    const handleDateClick = (value) => {
        setDate(value);
        setShowForm(true);
    };

    return (
        <div className="calendar-container">
            <h1>다이어리</h1>
            <ReactCalendar onChange={handleDateClick} value={date} />
            <DiaryModal
                show={showForm}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                onImageChange={(image) => setDiaryImage(image)}
                onContentChange={(content) => setDiaryContent(content)}
                content={diaryContent}
            />
        </div>
    );
}

export default Calendar;