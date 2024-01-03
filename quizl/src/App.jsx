import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Question from './components/Question'
import { motion } from 'framer-motion'
// ! add a feature to get a hint for the question
// ! Timed rounds
// ! Add a leaderboard
// ! Add a feature to choose a category
// ! Add a feature to choose the number of questions
// ! Add a feature to choose the difficulty of the questions
// ! organize components better to resemble a real app
function App() {
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [hideButton, setHideButton] = useState(false)
  const beginQuiz = async (e) => {
    try{
      const response = await axios.get('https://the-trivia-api.com/v2/questions?categories=music')
      response.data.forEach((question) => {
        question.incorrectAnswers.push(question.correctAnswer)
        question.incorrectAnswers.sort(() => Math.random() - 0.5)
      })
      setQuestions(response.data)
      setTimeout(() => {
        e.target.classList.toggle('hidden')
      }, 200);
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <h1 className='text-8xl underline mb-4 text-purple-600'>QuizL</h1>
      <h1 className='text-4xl underline mb-4 text-purple-600'>All In One Trivia Game</h1>

      <motion.div 
      className='text-black text-3xl p-2 bg-purple-400 rounded-xl w-fit mx-auto cursor-pointer' 
      onClick={beginQuiz} 
      initial={{ scale: .75 }}
      animate={{ scale: 1.25 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut'}}
    
      >Click to begin!</motion.div>
      <div>
        {
          questions.length > 0 && (
            <Question question={questions[currentQuestion]} setScore={setScore} score={score} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
          )
        }
      </div>
    </div>
  )
}

export default App
