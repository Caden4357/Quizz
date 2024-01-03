import React, {useState} from 'react';
import axios from 'axios';
import generalKnowledge from '../../assets/General.png';
import music from '../../assets/music.png';
import random from '../../assets/random.png';
import film from '../../assets/film.png';
import history from '../../assets/history.png';


const Category = (props) => {
    return (
        <div>
            <h2 className='text-4xl my-8'>Categories</h2>
            <div className='flex justify-evenly flex-wrap gap-10'>
                <div className='w-1/4 border p-2 cursor-pointer'>
                    <img src={music} alt='General Knowledge' className=''/>
                </div>
                <div className='w-1/4 border p-2 cursor-pointer '>
                    <img src={film} alt='General Knowledge' className=''/>
                </div>
                <div className='w-1/4 border p-2 cursor-pointer '>
                    <img src={history} alt='General Knowledge' className=''/>
                </div>
                <div className='w-1/4 border p-2 cursor-pointer '>
                    <img src={random} alt='General Knowledge' className=''/>
                </div>
            </div>
        </div>
)}

export default Category;