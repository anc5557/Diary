// path: backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const auth = require('../middleware/authMiddleware');
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

require('dotenv').config();

//jwt secret key, .env 파일에 저장
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h'; // 기본값 설정




// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    // 필수 입력값 확인
    if (!username || !password || !email) {
      return res.status(400).send('All fields are required');
    }

    // 비밀번호 형식 확인
    if (!passwordRegex.test(password)) {
      return res.status(400).send('Password must contain at least eight characters, including one letter and one number');
    }

    // 사용자 중복 확인
    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).send('User already exists');
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
    });

    // MongoDB에 저장
    await newUser.save();

    res.status(201).send('User created successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 필수 입력값 확인
    if (!username || !password) {
      return res.status(400).send('All fields are required');
    }

    // 사용자 확인
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // JWT 생성
    const token = jwt.sign({ id: user._id }, jwtSecretKey, { expiresIn: jwtExpiresIn });
    res.status(200).json({ token }); // JWT 토큰 응답
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// 회원 정보 변경
router.put('/update-info', auth, async (req, res) => {
  try {
    const userId = req.userId; 
    const { email, firstName, lastName } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.email = email || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    await user.save();
    res.status(200).send('User updated successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// 회원 정보 조회
router.get('/profile', auth, async (req, res) => { 
  try {
    const userId = req.userId; // 'auth' 미들웨어에서 설정된 사용자 ID 사용
    const user = await User.findById(userId).select('-password'); // 비밀번호 제외한 사용자 정보 조회
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user); // 사용자 정보 응답

  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).send('Invalid Token');
    } else {
      return res.status(500).send('Internal Server Error');
    }
  }
});

// 회원 탈퇴
router.delete('/delete', auth, async (req, res) => { 
  try {
    const userId = req.userId; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.remove();
    res.status(200).send('User deleted successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});


module.exports = router;
