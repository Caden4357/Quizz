import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import music from '../../assets/music.png';
import random from '../../assets/random.png';
import film from '../../assets/film.png';
import history from '../../assets/history.png';
import food from '../../assets/food.png';
import science from '../../assets/science.png';
import { motion } from 'framer-motion';

const images = [music, film, science, history, food, random]
const Category = (props) => {
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
                            <img src={image} alt={idx} className='' />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default Category;