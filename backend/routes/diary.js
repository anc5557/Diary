// backend/routes/diary.js

const express = require('express');
const router = express.Router();
const Diary = require('../models/Diary');
const authMiddleware = require('../middleware/authMiddleware');

// 일기장 날짜 데이터만 가져오기, 인증 미들웨어를 사용하여 보호
router.get('/dates', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const diaries = await Diary.find({ userId }, 'date -_id').exec();

        // 클라이언트에게 날짜 데이터 배열로 응답
        const dates = diaries.map(diary => diary.date);
        res.json(dates.map(date => date.toISOString().substring(0, 10))); // YYYY-MM-DD 형식으로 변환
    } catch (err) {
        // 에러 발생 시 에러 메시지 응답
        res.status(500).json({ message: err.message });
    }
});

// 해당 날짜에 대한 일기 데이터 가져오기
router.get('/:date', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const date = req.params.date; // URL에서 날짜를 가져옵니다.
        
        // 요청된 날짜와 일치하는 일기 데이터 찾기
        const diary = await Diary.findOne({
            userId,
            date: new Date(date) // 날짜 문자열을 Date 객체로 변환
        }).exec();

        if (diary) {
            // 일기 데이터를 클라이언트에게 응답
            res.json(diary);
        } else {
            // 일기 데이터가 없는 경우 404 상태 코드로 응답
            res.status(404).json({ message: 'Diary entry not found' });
        }
    } catch (err) {
        // 에러 발생 시 에러 메시지와 함께 500 상태 코드로 응답
        res.status(500).json({ message: err.message });
    }
});


// 일기 데이터 생성
router.post('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { title, content, date, emotion } = req.body; // 요청 바디에서 데이터를 가져옵니다.
        const diary = new Diary({ title, content, date, userId, emotion }); // 일기 데이터 생성
        await diary.save(); // 데이터베이스에 저장
        res.status(201).json(diary); // 생성된 일기 데이터를 클라이언트에게 응답
    } catch (err) {
        // 에러 발생 시 에러 메시지와 함께 400 상태 코드로 응답
        res.status(400).json({ message: err.message });
    }
});

// 일기 데이터 업데이트(제목, 감정, 내용)
router.patch('/:date', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const date = req.params.date; // URL에서 날짜를 가져옵니다.
        const { title, content, emotion } = req.body; // 요청 바디에서 데이터를 가져옵니다.
        
        // 요청된 날짜와 일치하는 일기 데이터 찾기
        const diary = await Diary.findOne({
            userId,
            date: new Date(date) // 날짜 문자열을 Date 객체로 변환
        }).exec();

        if (diary) {
            diary.title = title;
            diary.content = content;
            diary.emotion = emotion;
            await diary.save(); // 데이터베이스에 저장
            res.json(diary); // 업데이트된 일기 데이터를 클라이언트에게 응답
        } else {
            // 일기 데이터가 없는 경우 404 상태 코드로 응답
            res.status(404).json({ message: 'Diary entry not found' });
        }
    } catch (err) {
        // 에러 발생 시 에러 메시지와 함께 400 상태 코드로 응답
        res.status(400).json({ message: err.message });
    }
});


// 일기 데이터 삭제
router.delete('/:date', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const date = new Date(req.params.date);

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // 날짜 범위를 사용하여 일기 데이터를 찾아서 삭제
        const result = await Diary.deleteOne({
            userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Diary entry not found' });
        } else {
            res.json({ message: 'Diary entry deleted' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;