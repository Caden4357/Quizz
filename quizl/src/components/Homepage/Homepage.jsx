import React, { useState } from 'react';
import { motion } from 'framer-motion'
import Question from '../Question'
const Homepage = ({questions, setScore, score,currentQuestion, setCurrentQuestion}) => {
    return (
        <div>
            <div>
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