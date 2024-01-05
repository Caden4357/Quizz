import { useState } from 'react'
import { QuizProvider } from './context/QuizContext'
import './App.css'
import axios from 'axios'
import Homepage from './components/Homepage/Homepage'
import Nav from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Category from './components/categories/Category'
import Login from './components/LoginReg/Login'
import Reg from './components/LoginReg/Reg'
// ! Add a feature to choose a category (working)
// ? Add context for question and score ✔️
// ? Add a feature to choose the difficulty of the questions
// ? Add a feature to choose the number of questions
// ? add a feature to get a hint for the question
// ? Timed rounds
// ? Add a leaderboard
function App() {
  return (
    <div>
      <QuizProvider>
        <Nav />
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/categories' element={<Category />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Reg />} />
        </Routes>
      </QuizProvider>
    </div>
  )
}

export default App
