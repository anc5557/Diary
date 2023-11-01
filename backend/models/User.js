// path: backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String, // 사용자명
  password: String, // 비밀번호
  email: String, // 이메일
  firstName: String, // 이름
  lastName: String, // 성 
});

module.exports = mongoose.model('User', userSchema);
    
