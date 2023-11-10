// 설명 페이지

import React from 'react';
import '../App.css';

function About() {
  return (
    // 모든 내용을 감싸는 단일 div 태그 추가
    <div className="about-container">

      <div className="about-title">
        <h1 className="about-title">다이어리</h1>
        <p className="about-p">일기를 작성할 수 있는 웹 사이트입니다.</p>
        <p className="about-p">로그인이 필요합니다.</p>
      </div>

      <div className="about-content">
        <h2 className="about-func">기능</h2>
        <ul className='about-func-list'>
          <li>1. 회원 기능</li>
          <li>2. 달력 기능</li>
          <li>3. 일기 작성</li>
        </ul>
      </div>
    </div> 
  );
}

export default About;

    