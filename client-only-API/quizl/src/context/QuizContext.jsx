import {createContext, useState, useReducer} from 'react';

export const QuizContext = createContext();

const initialState = {
    category: '',
    score: 0,
    questions: [],
    currentQuestion: {},
    questionIdx: 0
}

const reducer = (state, action) => {    
    switch(action.type) {
        case 'SET_CATEGORY':
            console.log('SET_CATEGORY', action.payload);
            return {
                ...state,
                category: action.payload,
            }
        case 'SET_QUESTIONS':
            return {
                ...state,
                questions: action.payload
            }
        case 'SET_CURRENT_QUESTION':
            return {
                ...state,
                currentQuestion: action.payload
            }
        case 'SET_QUESTION_IDX':
            return {
                ...state,
                questionIdx: action.payload
            }
        case 'SET_SCORE':
            return {
                ...state,
                score: action.payload
            }
        case 'RESET_GAME':
            return {
                ...initialState,
                questions: [{}]
            }
        default:
            return state
    }
}


export const QuizProvider = (props) => {
    const [gameReducer, dispatch] = useReducer(reducer, initialState)
    return (
        <QuizContext.Provider value={{gameReducer, dispatch}}>
            {props.children}
        </QuizContext.Provider>
    )
}