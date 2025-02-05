import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TextBox, DropDown, MultipleAnswerQuestions } from './FormGenerator'
import './App.css'


export function FormParser({items}) {
    return (
        <>
            {
            items.map((item, index) => {
                    if(item.type === "textbox"){
                        return (
                            <TextBox key={item.id || index} question={item.question}/>
                        )
                    }
                    if(item.type === "checkbox"){
                        return (
                            <MultipleAnswerQuestions key={item.id || index}  question={item.question} answers={item.answers} type="checkbox"/>
                        )
                    }
                    if(item.type === "radio"){
                        return (
                            <MultipleAnswerQuestions key={item.id || index}  question={item.question} answers={item.answers} type="radio"/>
                        )
                    }
            })}
        </>
    )
}
