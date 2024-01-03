import React, { useRef, useState } from 'react';
import { motion } from "framer-motion"
const Question = ({ question, currentQuestion, setCurrentQuestion, score, setScore }) => {

    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [checked, setChecked] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const nextQuestion = () => {
        if (selectedAnswer === question.correctAnswer) {
            setScore(score + 1)
        }
        setCurrentQuestion(currentQuestion + 1)
    }
    const handleChange = (answer) => {
        console.log(answer);
        setSelectedAnswer(answer)
    }
    const submitQuiz = () => {
        if (selectedAnswer === question.correctAnswer) {
            setScore(score + 1)
        }
        setSubmitted(true)
    }
    return (
        <motion.div
            className='border p-10 bg-slate-400'
            initial={{  y: -1000 }}
            animate={{  y: 0 }}
            transition={{ duration: 5, type: 'spring', bounce: .25, stiffness: 100 }}
        >
            
            <div className='border border-red-500 w-2/4 mx-auto p-16 bg-indigo-900'>
                <h3 className='text-2xl'>{question.question.text}</h3>
                <ul>
                    {question.incorrectAnswers.map((answer, idx) => (
                        <div key={idx} style={{ width: '300px', textAlign: 'left', margin: '0 auto' }}>
                            <input name='answer' type='radio' onClick={() => handleChange(answer)} />
                            <label className='text-xl ml-2' >{answer}</label>
                        </div>
                    ))}
                </ul>
                {
                    currentQuestion === 9 ? <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={submitQuiz}>Submit</button> : <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={nextQuestion}>Next {currentQuestion + 1}/10</button>
                }
                {
                    submitted &&
                    <div>
                        <h2>Final Score: {score}/10</h2>
                        <button className='m-4 text-lg border p-2 bg-purple-400 rounded-xl font-bold text-black' onClick={() => window.location.reload()}>Restart</button>    
                    </div>

                }
            </div>
        </motion.div>
    )
}

export default Question;