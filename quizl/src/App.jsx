import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Question from './components/Question'
function App() {
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const beginQuiz = async () => {
    try{
      const response = await axios.get('https://the-trivia-api.com/v2/questions')
      response.data.forEach((question) => {
        question.incorrectAnswers.push(question.correctAnswer)
        question.incorrectAnswers.sort(() => Math.random() - 0.5)
      })
      console.log(response);
      setQuestions(response.data)
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <h1>Quizl</h1>
      <button onClick={beginQuiz}>Click to begin!</button>
      <h2>Score: {score}</h2>
      <div>
        {
          questions.length > 0 && (
            <Question question={questions[currentQuestion]} setScore={setScore} score={score} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
          )
        }
        {/* {
          questions.map((question) => (
            <Question question={question} setScore={setScore} score={score} />
          ))
        } */}
      </div>
    </>
  )
}

export default App
