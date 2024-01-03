import React, { useState } from 'react';
import { motion } from 'framer-motion'
import Question from '../Question'
import { Link } from 'react-router-dom'
const Homepage = ({beginQuiz, questions, setScore, score, currentQuestion, setCurrentQuestion }) => {
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
                {
                    questions.length > 0 && (
                        <motion.div
                        // initial={{ scale: .95 }}
                        // animate={{ scale: 1.25}}
                        // transition={{ duration: 1, ease: 'easeIn', delay: 1 }}
                        >
                            <Question question={questions[currentQuestion]} setScore={setScore} score={score} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
                        </motion.div>
                    )
                }
            </div>
        </div>
    )
}

export default Homepage;