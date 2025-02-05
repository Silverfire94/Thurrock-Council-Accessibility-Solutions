import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Container from 'react-bootstrap/Container'
import "bootstrap/dist/css/bootstrap.min.css"

export function TextBox({question}) {
    return(
        <div  className = "container mt-4">
            <label className = "header-question" >{question}</label>
            <div>
                <input type="text" className="form-control border border-1 border-dark" />
            </div>
        </div>
    )
}

export function DropDown({question, options}) {
    return(
        <div>
            <label className = "header-question">{question}</label>
            <div>
                <select>
                    {options.map((option,index) => {
                        return <option key={option.id || index} value={option}>{option}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export function MultipleAnswerQuestions({question,answers, type}){
    return (
        <div>
            <label className = "header-question">{question}</label>
            {answers.map((answer, index) => (
                <div key={answer.id || index}>
                    <input type={type} id={answer} name={answer} value={answer} className ={"custom-checkbox"}/>
                    <label htmlFor={answer}>{answer}</label>
                </div>
                ))}
        </div>
    )
}