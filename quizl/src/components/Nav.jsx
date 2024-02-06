import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const Nav = ({ beginQuiz }) => {
    const {user, setUser} = useContext(UserContext)

    const logout = () => {
        axios.post('http://localhost:8000/api/logout',{}, {withCredentials: true})
            .then(res => {
                setUser({name:'', email:'', loggedIn: false})
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='flex justify-between items-center'>
                <button className='text-xl underline w-1/4'>Leaderboard</button>
                {
                    user.loggedIn ? <h1 className='text-4xl w-2/4'>Welcome Back {user.name}</h1> : ''
                }
                {
                    user.loggedIn ? <button onClick={logout} className='text-xl underline w-1/4'>Logout</button> : <Link to={'/login'} className='text-xl underline w-1/4'>Login</Link>
                }
                
            </div>
            <Link to={'/'}><h1 className='text-8xl underline mb-4 text-purple-600'>QuizL</h1></Link>
            
            <h1 className='text-4xl underline mb-4 text-purple-600'>All In One Trivia Game</h1>
        </div>
    )
}

export default Nav;