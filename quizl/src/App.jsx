import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Question from './components/Question'
function App() {
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [hideButton, setHideButton] = useState(false)
  const beginQuiz = async (e) => {
    try{
      const response = await axios.get('https://the-trivia-api.com/v2/questions')
      response.data.forEach((question) => {
        question.incorrectAnswers.push(question.correctAnswer)
        question.incorrectAnswers.sort(() => Math.random() - 0.5)
      })
      setQuestions(response.data)
      e.target.classList.toggle('hidden')
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <h1 className='text-6xl underline mb-4 text-purple-600'>Quizl</h1>
      <h1 className='text-4xl underline mb-4 text-purple-600'>Random Trivia Game</h1>

      <button className='border p-2 bg-purple-400 rounded-xl font-bold' onClick={beginQuiz} >Click to begin!</button>
      <div>
        {
          questions.length > 0 && (
            <Question question={questions[currentQuestion]} setScore={setScore} score={score} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
          )
        }
      </div>
    </>
  )
}

export default App
