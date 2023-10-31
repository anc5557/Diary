const mongoose = require('mongoose');

// 일기장 기능을 위한 diarySchema 추가
const diarySchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    userId: String,
    images: [
        {
            url: String,
            location: {
                latitude: Number,
                longitude: Number
            }
        }
    ]
});

module.exports = mongoose.model('Diary', diarySchema);