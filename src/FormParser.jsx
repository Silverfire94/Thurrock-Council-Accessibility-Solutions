import { useState } from 'react'
import { TextBox, DropDown, Radio, CheckBox } from './FormGenerator'
import './App.css'
import { Environment } from 'aws-cdk-lib/aws-appconfig'


export function FormParser({items}) {
    const [name, setName] = useState("")
    const [radioQuestions, setRadioQuestions] = useState({})

    const handleSubmit = (event) => {
        console.log(event.target.value)
    }

    function handleForm(formData) {
        console.log(formData);
      }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {items.map((item, index) => {
                    if(item.type === "textbox"){
                        return (
                            <TextBox key={item.id || index} question={item.question}/>
                        )
                    }
                    if(item.type === "checkbox"){
                        return (
                            <CheckBox key={item.id || index}  question={item.question} answers={item.answers}/>
                        )
                    }
                    if(item.type === "radio"){
                        return (
                            <Radio key={item.id || index}  question={item.question} answers={item.answers}/>
                        )
                    }
                    if(item.type === "dropdown"){
                        return (
                            <DropDown key={item.id || index}  question={item.question} answers={item.answers}/>
                        )
                    }
                })}
                <input type="submit" />
            </form>
        </>
    )
}
