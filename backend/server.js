// path : backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const diaryRoutes = require('./routes/diary');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');

require('dotenv').config();
const uri = process.env.MONGO_URI;

// Express 서버 생성
const app = express();
app.use(express.json());

// cors 설정
app.use(cors()); // 모든 요청에 대해 CORS 허용 

// MongoDB 연결
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}); // MongoDB 연결
const connection = mongoose.connection;  // 연결 객체 생성
// 연결 성공 시
connection.once('open', () => { 
  console.log('MongoDB database connection established successfully');
});


// 라우트 설정
app.use('/auth', authRoutes);
app.use('/diary',authMiddleware, diaryRoutes);

// 서버 실행
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001/');
});

