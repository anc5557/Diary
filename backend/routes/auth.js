const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 비밀번호 규칙 검사
    if (!password.match(passwordRegex)) {
      return res.status(400).send('Password must contain both letters and numbers and be 8-20 characters long.');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword
    });
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
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

    res.status(200).send('User updated successfully');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
