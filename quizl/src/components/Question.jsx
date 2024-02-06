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
    const { currentGame, setCurrentGame } = useContext(QuizContext)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        setCurrentGame({ ...currentGame, currentQuestion: currentGame.questions[currentGame.questionIdx] });
    }, [currentGame.questionIdx])

    const nextQuestion = () => {
        if (selectedAnswer === currentGame.currentQuestion.correctAnswer) {
            setCurrentGame({ ...currentGame, score: currentGame.score++ })
        }
        setCurrentGame({ ...currentGame, questionIdx: currentGame.questionIdx + 1 })
        setSelectedAnswer(null)
    }
    const handleChange = (answer) => {
        setSelectedAnswer(answer.text)

        setCurrentGame(
            {
                ...currentGame,
                currentQuestion:
                {
                    ...currentGame.currentQuestion,
                    incorrectAnswers: currentGame.currentQuestion.incorrectAnswers.map((ansr) => ansr.text === answer.text ? { ...ansr, isChecked: true } : { ...ansr, isChecked: false })
                }
            })

    }
    const submitQuiz = () => {
        if (selectedAnswer === currentGame.currentQuestion.correctAnswer) {
            setCurrentGame({ ...currentGame, score: currentGame.score + 1 })
        }
        setSubmitted(true)
        const finalGame = {
            category: currentGame.category,
            score: currentGame.score,
            numberOfQuestions: currentGame.questions.length
        }
        axios.post('http://localhost:8000/api/post/quiz', finalGame, { withCredentials: true })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err)) 
    }
    const renderer = ({ seconds, completed, api }) => {
        if (completed) {
            nextQuestion()
        }
        else {
            api.start()
            const progressPercentage = ((30 - seconds) / 30) * 100;
            return <svg style={{ width: '50px', height: '50px', margin: '0px auto' }}>
                <circle r="18" cx="20" cy="20"></circle>
            </svg>
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
                <h3 className='text-2xl mb-6'>Category: {currentGame.currentQuestion?.category}</h3>
                <h3 className='text-2xl mb-6'>{currentGame.currentQuestion?.question?.text}</h3>
                <ul>
                    {currentGame.currentQuestion?.incorrectAnswers?.length > 0 &&
                        currentGame.currentQuestion.incorrectAnswers.map((answer, idx) => (
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
                            <h2>Final Score: {currentGame.score}/5</h2>
                            <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={() => navigate('/')}>Home</button>
                        </div> :
                        currentGame.questionIdx === 4 ? <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={submitQuiz}>Submit</button> : <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={nextQuestion}>Next {currentGame.questionIdx + 1}/5</button>

                }
            </div>
        </motion.div>
    )
}

export default Question;