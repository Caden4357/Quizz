import React, {useContext} from 'react';
import music from '../../assets/music.png';
import random from '../../assets/random.png';
import film from '../../assets/film.png';
import history from '../../assets/history.png';
import food from '../../assets/food.png';
import science from '../../assets/science.png';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QuizContext } from '../../context/QuizContext';

const images = [{
    img: music,
    name: 'Music'
}, {
    img: film,
    name: 'Film'
}, {
    img: science,
    name: 'Science'
}, {
    img: history,
    name: 'History'
}, {
    img: food,
    name: 'Food'
}, {
    img: random,
    name: 'Random'

}]
const Category = (props) => {
    const navigate = useNavigate()
    const {currentGame, setCurrentGame} = useContext(QuizContext)

    const chooseCategory = (e) => {
        console.log(e.target.alt);
        const category = e.target.alt
        axios.get(`https://the-trivia-api.com/v2/questions?categories=${category}&limit=10`)
            .then((response) => {
                response.data.forEach((question) => {
                    question.incorrectAnswers.push(question.correctAnswer)
                    question.incorrectAnswers = question.incorrectAnswers.map((answer) => {
                        return {
                            text: answer,
                            isChecked: false
                        }
                    })
                    question.incorrectAnswers.sort(() => Math.random() - 0.5)
                })
                setCurrentGame({ ...currentGame, questions: response.data, questionIdx: 0 })
                console.log(response.data);
                setTimeout(() => {
                    navigate('/quiz')
                }, 200);
            })
            .catch((error) => {
                console.log(error)
            })
        // navigate(`/categories/${category}`)
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