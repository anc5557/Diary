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

    // URL에서 date 쿼리 파라미터를 가져옵니다.
    const searchParams = new URLSearchParams(window.location.search);
    const dateParam = searchParams.get('date');
    if (dateParam) {
        setDate(moment(dateParam).format("YYYY-MM-DD"));
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
  }, [navigate]); // 의존성 배열을 추가하여 마운트 시에만 실행되도록 함

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    // 이미 존재하는 날짜인지 확인
    if (!diaries.includes(moment(newDate).format("YYYY-MM-DD"))) {
      // 존재하지 않는 날짜이면 상태를 업데이트하고 URL의 쿼리 파라미터를 변경
      setDate(newDate);
      navigate(`/diary/write?date=${moment(newDate).format("YYYY-MM-DD")}`);
    } else {
      // 이미 존재하는 날짜를 선택했다면 알림을 표시하고 상태를 업데이트하지 않음
      toast.error('이미 해당 날짜에 작성된 일기가 있습니다. 다른 날짜를 선택해주세요.');
      // 선택한 날짜를 리셋하기 위해 빈 문자열을 설정할 수 있습니다.
      event.target.value = '';
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
                style={{ resize: 'none' }}
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
