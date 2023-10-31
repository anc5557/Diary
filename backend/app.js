const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/Auth');

// Express 서버 생성
const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// 라우트 설정
app.use('/auth', authRoutes);

// 서버 실행
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001/');
});
