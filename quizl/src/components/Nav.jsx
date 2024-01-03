import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Nav = ({ beginQuiz }) => {
    return (
        <div>
            <div className='flex justify-between'>
                <button className='text-xl underline'>Leaderboard</button>
                <Link to={'/login'} className='text-xl underline'>Login</Link>
            </div>
            <h1 className='text-8xl underline mb-4 text-purple-600'>QuizL</h1>
            <h1 className='text-4xl underline mb-4 text-purple-600'>All In One Trivia Game</h1>
            <motion.div
                className='text-black text-3xl p-2 bg-purple-400 rounded-xl w-fit mx-auto cursor-pointer'
                onClick={beginQuiz}
                initial={{ scale: .95 }}
                animate={{ scale: 1.25 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            >Try A Quick Random Round</motion.div>
            <Link className='text-black block text-3xl p-2 bg-purple-400 rounded-xl w-fit mx-auto cursor-pointer m-6' to={'/categories'}>Select A Category</Link>
        </div>
    )
}

export default Nav;