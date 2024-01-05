import React, { useContext, useState, useEffect, useRef } from 'react';
import { QuizContext } from '../context/QuizContext';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
let choices = ['A', 'B', 'C', 'D']
const Question = () => {
    const navigate = useNavigate()
    const {currentGame, setCurrentGame} = useContext(QuizContext)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        setCurrentQuestion(currentGame.questions[currentGame.questionIdx]);
    }, [currentGame.questionIdx])

    const nextQuestion = () => {
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setCurrentGame({...currentGame, score:currentGame.score++})
        }
        setCurrentGame({...currentGame, questionIdx:currentGame.questionIdx+1})
        setSelectedAnswer(null)
    }
    const handleChange = (answer) => {
        setSelectedAnswer(answer.text)
        setCurrentQuestion({...currentQuestion, incorrectAnswers: currentQuestion.incorrectAnswers.map((ansr) => ansr.text === answer.text ? {...ansr, isChecked: true} : {...ansr, isChecked: false})})
        
    }
    const submitQuiz = () => {
        if (selectedAnswer === currentQuestion.correctAnswer.id) {
            setCurrentGame({...currentGame, score:currentGame.score + 1})
        }
        setSubmitted(true)
    }
    return (
        <motion.div
            className='mt-40 rounded-lg p-10 bg-slate-400 bs'
            initial={{  y: -1000 }}
            animate={{  y: -150 }}
            transition={{ duration: 5, type: 'spring', bounce: .25, stiffness: 150, ease: 'easeInOut'}}
        >
            
            <div className='w-2/4 mx-auto p-16 bg-indigo-900 bs-question rounded-2xl'>
                
                <h3 className='text-2xl mb-6'>{currentQuestion?.question?.text}</h3>
                <ul>
                    {currentQuestion?.incorrectAnswers?.length > 0 && 
                    currentQuestion.incorrectAnswers.map((answer, idx) => (
                        <div key={idx} style={{ width: '300px', textAlign: 'left', margin: '0 auto' }}>
                            <input 
                                name='answer' 
                                type='radio' 
                                // value={answer.text}
                                checked={answer.isChecked}
                                onChange={() => handleChange(answer)}
                            />
                            <label className='text-xl ml-2' ><span className='mr-1'>{choices[idx]}.)</span> {answer.text}</label>
                        </div>
                    ))}
                </ul>
                {
                    currentGame.questionIdx === 9 ? <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={submitQuiz}>Submit</button> : <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={nextQuestion}>Next {currentGame.questionIdx + 1}/10</button>
                }
                {
                    submitted &&
                    <div>
                        <h2>Final Score: {currentGame.score}/10</h2>
                        <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={() => navigate('/')}>Home</button>    
                    </div>

                }
            </div>
        </motion.div>
    )
}

export default Question;