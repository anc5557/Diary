
import React, { useState } from "react";

function WriteDiary() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 서버로 일기 데이터 전송
    fetch("/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        일기 제목:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <br />
      <label>
        일기 내용:
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">작성 완료</button>
    </form>
  );
}

export default WriteDiary;
