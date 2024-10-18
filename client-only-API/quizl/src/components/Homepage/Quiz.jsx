import React, { useContext } from 'react';
import { QuizContext } from '../../context/QuizContext';
import {motion} from 'framer-motion'
import Question from '../Question'
const Quiz = (props) => {
    const {gameReducer} = useContext(QuizContext)

    return (
        <div>
            {
                gameReducer.questions.length > 0 && (
                    <motion.div
                    // initial={{ scale: .95 }}
                    // animate={{ scale: 1.25}}
                    // transition={{ duration: 1, ease: 'easeIn', delay: 1 }}
                    >
                        <Question/>
                    </motion.div>
                )
            }
        </div>
    )
}

export default Quiz;