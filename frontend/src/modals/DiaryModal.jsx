import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import moment from "moment";
import axios from "axios";
import "./DiaryModal.css";
import 'react-confirm-alert/src/react-confirm-alert.css';


function DiaryModal({ show, diaryData, setDiaryData, onClose, removeDiaryEntry }) {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드인지 여부를 저장하는 state
  const [editedDiaryData, setEditedDiaryData] = useState(diaryData || {}); // 수정된 일기 데이터를 저장하는 state

  const emotions = ["기쁨", "행복", "우울", "분노", "슬픔", "즐거움", "걱정", "편안함"];

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

  const handleSaveClick = async () => {
    const formattedDate = moment(diaryData.date).format("YYYY-MM-DD");
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await axios.patch(`http://localhost:3001/diary/${formattedDate}`, editedDiaryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDiaryData(response.data);
    }
    catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  }

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedDiaryData(diaryData || {});
  }

  const handleDeleteClick = () => {
    confirmAlert({
      title: '일기 삭제 확인',
      message: '정말로 이 일기를 삭제하시겠습니까?',
      buttons: [
        {
          label: '예',
          onClick: async () => {
            const formattedDate = moment(diaryData.date).format("YYYY-MM-DD");
            try {
              const token = localStorage.getItem('token');
              if (!token) {
                toast.error('인증 토큰이 없습니다.');
                return;
              }
              await axios.delete(`http://localhost:3001/diary/${formattedDate}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              toast.success('일기가 성공적으로 삭제되었습니다.');
              removeDiaryEntry(formattedDate); // 콜백 함수 호출로 상위 컴포넌트의 상태 갱신
              setDiaryData(null);
              onClose();
            } catch (error) {
              toast.error('일기 삭제에 실패했습니다.');
              console.error(error);
            }
          }
        },
        {
          label: '아니요'
        }
      ]
    });
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
                <select
                  className="Diary-emotion-edit"
                  value={editedDiaryData.emotion || ''}
                  onChange={(e) => setEditedDiaryData({ ...editedDiaryData, emotion: e.target.value })}
                >
                  {emotions.map(emotion => (
                    <option key={emotion} value={emotion}>{emotion}</option>
                  ))}
                </select>
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
              <button className="Diary-delete" onClick={handleDeleteClick}>삭제</button>
              <button className="Diary-close" onClick={onClose}>닫기</button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default DiaryModal;
