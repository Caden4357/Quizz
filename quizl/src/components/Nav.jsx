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
        </div>
    )
}

export default Nav;