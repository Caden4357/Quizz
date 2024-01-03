import React, { useState } from 'react';

const Question = ({ question, currentQuestion, setCurrentQuestion, score, setScore }) => {

    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [checked, setChecked] = useState(false)
    const [finalScore, setFinalScore] = useState(0)
    const nextQuestion = () => {
        if (selectedAnswer === question.correctAnswer) {
            setScore(score + 1)
        }
        setCurrentQuestion(currentQuestion + 1)
    }
    const handleChange = (answer) => {
        console.log(answer);
        setSelectedAnswer(answer)
    }
    const submitQuiz = () => {

    }
    return (
        <div>
            <div>
                <h3>{question.question.text}</h3>
                <ul>
                    {question.incorrectAnswers.map((answer, idx) => (
                        <div key={idx} style={{ width: '300px', textAlign: 'left', margin: '0 auto' }}>
                            <input name='answer' type='radio' onClick={() => handleChange(answer)} />
                            <label>{answer}</label>
                        </div>
                    ))}
                </ul>
                {
                    currentQuestion === 9 ? <button onClick={submitQuiz}>Submit</button> : <button onClick={nextQuestion}>Next {currentQuestion + 1}/10</button>
                }
                {
                    currentQuestion === 9 &&
                    <div>
                        <h2>Final Score: {score}/10</h2>
                        <button onClick={() => window.location.reload()}>Restart</button>    
                    </div>

                }
            </div>
        </div>
    )
}

export default Question;