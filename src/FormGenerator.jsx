import { useState, Component } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function TextBox({question}) {
    return(
        <div>
            <label>{question}</label>
            <div>
                <input type="text" className=""/>
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
                    {options.map((option,index) => {
                        return <option key={option.id || index} value={option}>{option}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export function CheckBox({question,answers}){

    return (
        <div>
            <label>{question}</label>
            {answers.map((answer, index) => (
                <div key={answer.id || index}>
                    <input 
                        type="checkbox" 
                        id={answer.id} 
                        name={answer} 
                        value={answer}
                    />
                    <label htmlFor={answer}>{answer}</label>
                </div>
                ))}
        </div>
    )
}

export function Radio({ question, answers }) {
    // const [selectedValue, setSelectedValue] = useState(answers[0])

    // const handleRadioChange = (event) => {
    //     const radioOptions = document.getElementsByA("input");

    // }

    return (
        <div>
            <label>{question}</label>
            {answers.map((answer, index) => (
                <div key={answer.id || index}>
                    <input 
                        type="radio"
                        id={answer.id} 
                        name={question} 
                        value={answer}
                        // choice=""
                        // onChange={(e) => handleRadioChange(e)}
                    />
                    <label htmlFor={answer}>{answer}</label>
                </div>
            ))}
        </div>
    )
}

// export function Radio({question,answers}){
//     const [selectedValue,setSelectedValue] = useState(answers[0]);

//     const handleRadioChange = (value) => {
//         setSelectedValue(value);
//     };

//     return (
//         <div>
//             <label>{question}</label>
//             {answers.map((answer, index) => (
//                 <div key={answer.id || index}>
//                     <input 
//                         type="radio"
//                         id={answer.id} 
//                         name={answer} 
//                         value={answer}
//                         checked={
//                             selectedValue === answer
//                         }
//                         onChange={() => handleRadioChange(answer)}
//                     />
//                     <label htmlFor={answer}>{answer}</label>
//                 </div>
//             ))}
//         </div>
//     )
// }