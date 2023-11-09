import React from "react";
import "./DiaryModal.css";

function DiaryModal({ show, diaryData, onClose }) {
  if (!show) {
    return null;
  }

  // diaryData가 있을 때만 내용을 구조 분해 할당을 통해 가져옵니다.
  const { title, content, date, emotion } = diaryData || {};

  // 서버로부터 받은 date를 'YYYY-MM-DD' 형식으로 포맷팅합니다.
  const formattedDate = date ? new Date(date).toLocaleDateString() : '';

  return (
    <div className="DiaryModal-backdrop">
      <div className="DiaryModal">
        <div className="DiaryModal-content">
          <h2>{title || '제목 없음'}</h2> {/* 제목 */}
          <p><strong>날짜:</strong> {formattedDate}</p> {/* 날짜 */}
          <p><strong>감정:</strong> {emotion || '감정 없음'}</p> {/* 감정 */}
          <textarea
            value={content || ''}
            readOnly
          />
        </div>

        <div className="DiaryModal-toolbar">
            <button className="Diary-close" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default DiaryModal;
