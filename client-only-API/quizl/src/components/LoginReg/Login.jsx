import React, {useState, useContext} from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
const Login = (props) => {  
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('c@aol.com')
    const [password, setPassword] = useState('12345678')
    const [error, setError] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {email, password}, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                setUser({...user, name: res.data.name, email: res.data.email, loggedIn: true})
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                setError('Invalid Credentials')
            })
    }

    return (
        <motion.div
            className='flex flex-col justify-center items-center'
            initial={{opacity: 0, y: -100}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 2, ease: 'easeIn', type: 'spring', stiffness: 100, bounce: 0.5}}
        >
            <h2 className='text-4xl my-8'>Login</h2>
            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                {
                    error ? <p className='text-red-500'>{error}</p> : ''
                }
                <input type="text" placeholder='Email' className='border-2 border-black rounded-xl p-2 text-black' onChange={(e) => setEmail(e.target.value)} value={email}/>
                <input type="password" placeholder='Password' className='border-2 border-black rounded-xl p-2 text-black' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button className='bg-black text-white rounded-xl p-2'>Login</button>
            </form>
            <p className='my-4'>Don't have an account? <Link to='/register' className='text-blue-500'>Register</Link></p>
        </motion.div>
)}

export default Login;