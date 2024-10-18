import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/QuizContext';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import Countdown from 'react-countdown';
import './Question.css'
let choices = ['A', 'B', 'C', 'D']
const Question = ({ time }) => {
    const navigate = useNavigate()
    const {gameReducer, dispatch} = useContext(QuizContext)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [finalScore, setFinalScore] = useState(0)

    useEffect(() => {
        dispatch({type: 'SET_CURRENT_QUESTION', payload: gameReducer.questions[gameReducer.questionIdx]})
    }, [gameReducer.questionIdx])

    const nextQuestion = () => {
        if (selectedAnswer === gameReducer.currentQuestion.correctAnswer) {
            dispatch({type: 'SET_SCORE', payload: gameReducer.score + 1})
            console.log(selectedAnswer);
        }
        dispatch({type: 'SET_QUESTION_IDX', payload: gameReducer.questionIdx + 1})
        setSelectedAnswer(null)
    }
    const handleChange = (answer) => {
        setSelectedAnswer(answer.text)

        dispatch({type: 'SET_CURRENT_QUESTION', payload: {
            ...gameReducer.currentQuestion,
            incorrectAnswers: gameReducer.currentQuestion.incorrectAnswers.map((ansr) => ansr.text === answer.text ? { ...ansr, isChecked: true } : { ...ansr, isChecked: false })
        }})
    }
    // ! HERE
    const submitQuiz = async () => {
        setSubmitted(true)
        // Consider directly updating the score for the final submission based on the last answer correctness.
        const updatedScore = selectedAnswer === gameReducer.currentQuestion.correctAnswer ? gameReducer.score + 1 : gameReducer.score;
        setFinalScore(updatedScore)
        // Prepare the final data with the potentially updated score.
        const finalGame = {
            category: gameReducer.category,
            score: updatedScore, // Use the updated score.
            numberOfQuestions: gameReducer.questions.length
        };
    
        console.log('FINAL GAME', finalGame);
    
        // Send the final game data to the server.
        axios.post('http://localhost:8000/api/post/quiz', finalGame, { withCredentials: true })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err)); 
    };
    
    const renderer = ({ seconds, completed, api }) => {
        if (completed) {
            nextQuestion()
        }
        else{
            return seconds
        }
    }
    return (
        <motion.div
            className='mt-40 rounded-lg p-10 bg-slate-400 bs'
            initial={{ y: -1000 }}
            animate={{ y: -150 }}
            transition={{ duration: 5, type: 'spring', bounce: .25, stiffness: 150, ease: 'easeInOut' }}
        >

            <div className='w-2/4 mx-auto p-16 bg-indigo-900 bs-question rounded-2xl'>

                <Countdown date={time ? Date.now() + time : Date.now() + 30000} renderer={renderer} />
                <h3 className='text-2xl mb-6'>Category: {gameReducer.currentQuestion?.category}</h3>
                <h3 className='text-2xl mb-6'>{gameReducer.currentQuestion?.question?.text}</h3>
                <ul>
                    {gameReducer.currentQuestion?.incorrectAnswers?.length > 0 &&
                        gameReducer.currentQuestion.incorrectAnswers.map((answer, idx) => (
                            <div key={idx} style={{ width: '300px', textAlign: 'left', margin: '0 auto' }}>
                                <input
                                    name='answer'
                                    type='radio'
                                    checked={answer.isChecked}
                                    onChange={() => handleChange(answer)}
                                />
                                <label className='text-xl ml-2' ><span className='mr-1'>{choices[idx]}.)</span> {answer.text}</label>
                            </div>
                        ))}
                </ul>

                {
                    submitted ?
                        <div>
                            <h2>Final Score: {finalScore}/5</h2>
                            <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={() => navigate('/')}>Home</button>
                        </div> :
                        gameReducer.questionIdx === 4 ? <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={submitQuiz}>Submit</button> : <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' 
                        onClick={nextQuestion}
                        >Next {gameReducer.questionIdx + 1}/5</button>
                }
            </div>
        </motion.div>
    )
}

export default Question;