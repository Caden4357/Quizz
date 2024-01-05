import React, { useContext } from 'react';
import { QuizContext } from '../../context/QuizContext';
import { motion } from 'framer-motion'
import Question from '../Question'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const Homepage = (props) => {
    const navigate = useNavigate()
    const {currentGame, setCurrentGame} = useContext(QuizContext)

    const beginQuiz = async (e) => {
        try {
            const response = await axios.get('https://the-trivia-api.com/v2/questions?limit=10')
            response.data.forEach((question) => {
                question.incorrectAnswers.push(question.correctAnswer)
                question.incorrectAnswers = question.incorrectAnswers.map((answer) => {
                    return {
                        text: answer,
                        isChecked: false
                    }
                })
                question.incorrectAnswers.sort(() => Math.random() - 0.5)
            })
            setCurrentGame({ ...currentGame, questions: response.data })
            setTimeout(() => {
                e.target.classList.toggle('hidden')
                navigate('/quiz')
            }, 200);

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <motion.div
                    className='text-black text-3xl p-2 bg-purple-400 rounded-xl w-fit mx-auto cursor-pointer'
                    onClick={beginQuiz}
                    initial={{ scale: .95 }}
                    animate={{ scale: 1.25 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                >Try A Quick Random Round</motion.div>
                <Link className='text-black block text-3xl p-2 bg-purple-400 rounded-xl w-fit mx-auto cursor-pointer m-6' to={'/categories'}>Select A Category</Link>
            </div>
        </div>
    )
}

export default Homepage;