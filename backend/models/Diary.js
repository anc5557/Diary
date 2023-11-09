// path: backend/models/Diary.js
const mongoose = require('mongoose');
const User = require('./User');

// 일기장 기능을 위한 diarySchema 추가
const diarySchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    emotion: String,
});

module.exports = mongoose.model('Diary', diarySchema);