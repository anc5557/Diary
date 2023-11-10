const mongoose = require('mongoose');
const Diary = require('../models/Diary');
require('dotenv').config();
const uri = process.env.MONGO_URI;


// MongoDB 데이터베이스에 연결합니다.
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 테스트 데이터를 생성합니다. 여기서 'userId'는 실제 MongoDB에 존재하는 유저의 ObjectId를 사용해야 합니다.
const testDiary = new Diary({
  title: '테스트 일기 제목123',
  content: '이것은 테스트 일기 내용입니다.1232132',
  date: '2023-11-16', 
  userId: "6541c1dc589ddad1ef1417de",
  emotion: '우울'
});



// 테스트 데이터를 데이터베이스에 저장합니다.
testDiary.save()
  .then(doc => {
    console.log('테스트 데이터가 성공적으로 추가되었습니다.', doc);
    mongoose.connection.close(); // 작업이 끝나면 연결을 닫습니다.
  })
  .catch(err => {
    console.error('데이터 추가 중 오류가 발생했습니다:', err);
    mongoose.connection.close(); // 에러가 발생해도 연결을 닫습니다.
  });