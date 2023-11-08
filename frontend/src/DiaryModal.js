import React from "react";
import "./DiaryModal.css"; // 모달 컴포넌트 스타일 시트 불러오기

function DiaryModal({ show, onImageChange, onContentChange, onClose, onSubmit, content }) {
  if (!show) {
    return null;
  }

  const handleImageChange = (e) => {
    onImageChange(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    onContentChange(e.target.value);
  };

  return (
    <div className="DiaryModal-backdrop">
      <div className="DiaryModal">
        <textarea
            value={content}
            onChange={handleContentChange}
        />
        <input type="file" onChange={handleImageChange} />
        <div className="DiaryModal-toolbar">
            <button className="Diary-close" onClick={onClose}>닫기</button>
            <button className="Diary-submit" onClick={onSubmit}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default DiaryModal;
