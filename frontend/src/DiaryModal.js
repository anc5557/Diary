import React, { useState, useEffect } from "react";
import "./DiaryModal.css";

function DiaryModal({ show, diaryData, onClose }) {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드인지 여부를 저장하는 state
  const [editedDiaryData, setEditedDiaryData] = useState(diaryData || {}); // 수정된 일기 데이터를 저장하는 state

  useEffect(() => {
    setEditedDiaryData(diaryData || {});
  }, [diaryData]);

  if (!show) {
    return null;
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDiaryData(diaryData || {});
  }

  const handleSaveClick = () => {
    // 수정된 일기 데이터를 서버에 저장하는 로직을 추가해야 합니다.
    setIsEditing(false);
  }

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedDiaryData(diaryData || {});
  }

  return (
    <div className="DiaryModal-backdrop">
      <div className="DiaryModal">
        <div className="DiaryModal-content">
          {isEditing ? (
            <>
              <label>
              <span><strong>제목</strong></span>
                <input className="Diary-title-edit"
                  type="text"
                  value={editedDiaryData.title || ''}
                  onChange={(e) => setEditedDiaryData({ ...editedDiaryData, title: e.target.value })}
                />
              </label>
              <label>
              <span><strong>감정</strong></span>
                <input className="Diary-emotion-edit"
                  type="text"
                  value={editedDiaryData.emotion || ''}
                  onChange={(e) => setEditedDiaryData({ ...editedDiaryData, emotion: e.target.value })}
                />
              </label>
              <label>
              <span><strong>내용</strong></span>
                <textarea
                  value={editedDiaryData.content || ''}
                  onChange={(e) => setEditedDiaryData({ ...editedDiaryData, content: e.target.value })}
                />
              </label>
            </>
          ) : (
            <>
              <h2>{diaryData?.title || '제목 없음'}</h2> {/* 제목 */}
              <p><strong>날짜:</strong> {diaryData?.date ? new Date(diaryData.date).toLocaleDateString() : ''}</p> {/* 날짜 */}
              <p><strong>감정:</strong> {diaryData?.emotion || '감정 없음'}</p> {/* 감정 */}
              <textarea
                value={diaryData?.content || ''}
                readOnly
              />
            </>
          )}
        </div>

        <div className="DiaryModal-toolbar">
          {isEditing ? (
            <>
              <button className="Diary-save" onClick={handleSaveClick}>저장</button>
              <button className="Diary-cancel" onClick={handleCancelClick}>취소</button>
            </>
          ) : (
            <>
              <button className="Diary-edit" onClick={handleEditClick}>수정</button>
              <button className="Diary-close" onClick={onClose}>닫기</button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default DiaryModal;
