import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function TextBox({question}) {

    return(
        <div>
            <label>{question}</label>
            <div>
                <input type="text" />
            </div>
        </div>



    )


}



export function DropDown({question, options}) {
    return(
        <div>
            <label>{question}</label>
            <div>
                <select>
                    {options.map((option) => {
                        return <option value={option}>{option}</option>
                    })}
                </select>
            </div>
        </div>
    )
}


export function MultipleAnswerQuestions({question,answers, type}){
    return (
        <div>
            <label>{question}</label>
            {answers.map((answer) => {
                return(
                    <div>
                        <input type={type} id={answer} name={answer} value={answer} />
                        <label for={answer}>{answer}</label>
                    </div>
                )
            })}
        </div>
    )
}






