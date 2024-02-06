import {createContext, useState} from 'react';

export const QuizContext = createContext();



export const QuizProvider = (props) => {
    const [currentGame, setCurrentGame] = useState({
        category: '',
        score: 0,
        questions: [],
        currentQuestion: {},
        questionIdx: 0
    })

    return (
        <QuizContext.Provider value={{currentGame, setCurrentGame}}>
            {props.children}
        </QuizContext.Provider>
    )
}