import React, {useState} from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
const Login = (props) => {
    return (
        <motion.div
            className='flex flex-col justify-center items-center'
            initial={{opacity: 0, y: -100}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 2, ease: 'easeIn', type: 'spring', stiffness: 100, bounce: 0.5}}
        >
            <h2 className='text-4xl my-8'>Login</h2>
            <form className='flex flex-col gap-4'>
                <input type="text" placeholder='Username' className='border-2 border-black rounded-xl p-2' />
                <input type="password" placeholder='Password' className='border-2 border-black rounded-xl p-2' />
                <button className='bg-black text-white rounded-xl p-2'>Login</button>
            </form>
            <p className='my-4'>Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link></p>
        </motion.div>
)}

export default Login;