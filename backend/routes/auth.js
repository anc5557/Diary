// path: backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    // 필수 입력값 확인
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).send('All fields are required');
    }

    // 비밀번호 유효성 검사
    if (!password.match(passwordRegex)) {
      return res.status(400).send('Password must contain both letters and numbers and be 8-20 characters long.');
    }

    // username 중복 검사
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 암호화
    // 회원가입 정보 저장 
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
    });
    
    // 정보 확인
    console.log("회원가입 정보",{
      username,
      password,
      email,
      firstName,
      lastName,
    });
    
    
    res.status(201).json({ id: user._id, message: "회원가입이 성공적으로 완료되었습니다." }); // 회원가입 성공
  } catch (err) {
    res.status(500).send('Internal server error'); // 서버 에러
  }
});


// 로그인
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Username not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Incorrect password');
    }

    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

    // 로그인 확인
    console.log("로그인 확인",{
      username,
      password,
      token,
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// 회원 정보 변경
router.put('/update', async (req, res) => {
  try {
    const { newPassword, firstName, lastName, email } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send('User not found');
    }

    if (newPassword) {
      if (!newPassword.match(passwordRegex)) {
        return res.status(400).send('New password must contain both letters and numbers and be 8-20 characters long.');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();
    
    // 회원 정보 변경 확인
    console.log("변경된 회원정보",{
      newPassword,
      firstName,
      lastName,
      email,
    });

    res.status(200).send('User updated successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
