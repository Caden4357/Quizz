import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
const Nav = ({ beginQuiz }) => {
    return (
        <div>
            <button className='text-xl block w-full text-right underline'>Login</button>
            
            <h1 className='text-8xl underline mb-4 text-purple-600'>QuizL</h1>
            <h1 className='text-4xl underline mb-4 text-purple-600'>All In One Trivia Game</h1>
            <motion.div
                className='text-black text-3xl p-2 bg-purple-400 rounded-xl w-fit mx-auto cursor-pointer'
                onClick={beginQuiz}
                initial={{ scale: .95 }}
                animate={{ scale: 1.25 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >Click to begin!</motion.div>
        </div>
    )
}

export default Nav;