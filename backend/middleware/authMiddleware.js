// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// jwt 토큰 인증 미들웨어
const auth = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; // 'Bearer' 토큰 추출
      const decoded = jwt.verify(token, jwtSecretKey); // 토큰 해독
      req.userId = decoded.id; // 사용자 ID를 요청 객체에 저장
      next();
    } catch (err) {
      res.status(401).send('Invalid Token');
    }
    
  };

module.exports = auth;
