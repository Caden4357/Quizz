import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Question from './components/Question'
import { motion } from 'framer-motion'
import Nav from './components/Nav'
// ! add a feature to get a hint for the question
// ! Timed rounds
// ! Add a leaderboard
// ! Add a feature to choose a category
// ! Add a feature to choose the number of questions
// ! Add a feature to choose the difficulty of the questions
function App() {
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const beginQuiz = async (e) => {
    try {
      const response = await axios.get('https://the-trivia-api.com/v2/questions')
      console.log(response.data);
      response.data.forEach((question) => {
        question.incorrectAnswers.push(question.correctAnswer)
        question.incorrectAnswers.sort(() => Math.random() - 0.5)
      })
      setQuestions(response.data)
      setTimeout(() => {
        e.target.classList.toggle('hidden')
      }, 200);
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Nav beginQuiz={beginQuiz} />
      <div>
        {
          questions.length > 0 && (
            <motion.div
              initial={{ scale: .95 }}
              animate={{ scale: 1.25}}
              transition={{ duration: 1, ease: 'easeIn', delay: 1 }}
            >
              <Question question={questions[currentQuestion]} setScore={setScore} score={score} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
            </motion.div>
          )
        }
      </div>
    </div>
  )
}

export default App
