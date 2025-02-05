import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function TextBox({question}) {
    return(
        <div>
            <label className="form-prompt">{question}</label>
            <input type="text" class="form-control" />
        </div>
    )
}

export function DropDown({question, options}) {
    return(
        <div>
            <label className="form-prompt">{question}</label>
            <select>
                {options.map((option,index) => {
                    return <option key={option.id || index} value={option}>{option}</option>
                })}
            </select>
        </div>
    )
}

export function MultipleAnswerQuestions({question,answers, type}){
    return (
        <div>
            <label className="header-question">{question}</label>
            {answers.map((answer, index) => (
                <div key={answer.id || index}>
                    <input type={type} id={answer} name={answer} value={answer} className ="custom-checkbox"/>
                    <label htmlFor={answer}>{answer}</label>
                </div>
                ))}
        </div>
    )
}