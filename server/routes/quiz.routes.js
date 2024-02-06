import { Router } from "express";
import * as QuizController from "../controllers/quiz.controller.js";
const router = Router();

router.post("/post/quiz", QuizController.createQuiz);

export default router;