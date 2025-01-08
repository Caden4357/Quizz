import React, {useContext} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import startQuiz from '../../functions/Quiz';
import { QuizContext } from '../../context/QuizContext';
import images from './images';
const Category = (props) => {
    const navigate = useNavigate()
    const {gameReducer, dispatch} = useContext(QuizContext)


    const chooseCategory = async (e) => {
        const game = await startQuiz(e.target.alt)
        dispatch({type: 'SET_CATEGORY', payload: e.target.alt})
        console.log('GAME: ',game);
        dispatch({type: 'SET_QUESTIONS', payload: game})
        setTimeout(() => {
            navigate('/quiz')
        }, 200);
    }

    return (
        <div>
            <h2 className='text-4xl my-8'>Categories</h2>
            <div className='flex justify-evenly flex-wrap gap-10'>
                {
                    images.map((image, idx) => (
                        <motion.div
                            key={idx}
                            className='w-1/4 p-2 cursor-pointer rounded-xl'
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: idx * .2, ease: 'easeInOut', type: 'spring' }}
                        >
                            <img src={image.img} alt={image.name} onClick={chooseCategory}/>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default Category;