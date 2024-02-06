import Quiz from '../models/quiz.js';
import jwt from 'jsonwebtoken';
const SECRET = process.env.SECRET_KEY;

async function createQuiz(req, res) {
    try {
        const token = req.cookies.userToken;
        const decoded = jwt.verify(token, SECRET);
        req.body.user = decoded._id;
        const newQuiz = await Quiz.create(req.body);
        res.status(201).json(newQuiz);
    }
    catch (err) {
        res.status(400).json(err);
    }
}

export { createQuiz };