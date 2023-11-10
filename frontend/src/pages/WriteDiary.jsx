import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "./WriteDiary.css";

function WriteDiary() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const emotions = ["기쁨", "행복", "우울", "분노", "슬픔", "즐거움", "걱정", "편안함"];

  // 일기 작성 페이지 렌더링 시, 다이어리 날짜 데이터 가져오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login', { replace: true });
      return;
    }
    axios.get('http://localhost:3001/diary/dates', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const dates = response.data.map(date => moment(date).format("YYYY-MM-DD"));
        setDiaries(dates);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // 의존성 배열을 추가하여 마운트 시에만 실행되도록 함

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    // 이미 존재하는 날짜인지 확인하고, 그렇지 않을 경우 상태를 업데이트함
    if (!diaries.includes(moment(newDate).format("YYYY-MM-DD"))) {
      setDate(newDate);
    } else {
      // 사용자에게 이미 해당 날짜에 대한 일기가 존재한다고 알림
      toast.error('이미 해당 날짜에 작성된 일기가 있습니다. 다른 날짜를 선택해주세요.');
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // 입력 검증
    if (!title || !content || !emotion || !date) {
      toast.error('모든 필드를 채워주세요.');
      return;
    }
    const diaryData = {
      title,
      content,
      date,
      emotion
    };

    try {
      // 서버로 POST 요청 보내기
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/diary', diaryData, {
        headers: {
          // 필요한 경우 인증 토큰을 여기에 추가
          'Authorization': `Bearer ${token}`
        }
      });

      // 일기 작성 완료 후, 홈 화면으로 이동
      toast.success('일기 작성이 완료되었습니다.');
      navigate('/', { replace: true });

    } catch (error) {
      toast.error(error.message);
    }

  };


  return (
    <div className="writediary-container">
      <h1>일기 작성</h1>
      <form onSubmit={handleSubmit}>

        <div className="input-box-container">
          <div className="input-box">
            <label>
              제목
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
          </div>
          <div className="input-box">
            <label>
              날짜
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
              />
            </label>
          </div>
          <div className="input-box">
            <label>
              감정
              <select value={emotion} onChange={(event) => setEmotion(event.target.value)}>
                <option value="">감정을 선택하세요</option>
                {emotions.map((emotion) => (
                  <option key={emotion} value={emotion}>
                    {emotion}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="input-box">
            <label>
              내용
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </label>
          </div>
        </div>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );


}

export default WriteDiary;
