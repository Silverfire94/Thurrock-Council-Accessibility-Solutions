import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TextBox, DropDown, MultipleAnswerQuestions } from './FormGenerator'
import './App.css'
import { GetLanguages } from './LanguagesDropDown'
import {questions} from "./SampleForm.json"
import { TextInput, Checkbox, Radio, Stack, Group, Container, Button, Text, Code } from '@mantine/core'
import { useForm } from '@mantine/form'

export function FormParser() {
    const [items, setItems] = useState([])

    useEffect(()=>{
      setItems(questions)
    },[])

    const form = useForm({
        mode: 'uncontrolled'
    })

    const [submittedValues, setSubmittedValues] = useState([]);

    const [checkboxValues, setCheckboxValues] = useState([]);

    return (
        <Container size="xs" pt={30} pb={60}>
            <Stack justify='flex-start' align='stretch' gap="lg">
                <form onSubmit={form.onSubmit(setSubmittedValues)}>
                {
                items.map((item, index) => {
                        if(item.type === "textbox"){
                            return (
                                // <TextBox key={item.id || index} question={item.question}/>

                                <TextInput {...form.getInputProps({index})} key={item.id || index} label={item.question} />
                            )
                        }
                        if(item.type === "checkbox"){
                            return (
                                // <MultipleAnswerQuestions key={item.id || index}  question={item.question} answers={item.answers} type="checkbox"/>

                                <Checkbox.Group value={checkboxValues} onChange={setCheckboxValues} key={item.id || index} label={item.question} >
                                    <Stack gap="xs">
                                    {item.answers.map( (answer, index) => (
                                        <Checkbox key={item.id || index} value={answer} label={answer}/>
                                    ))}
                                    </Stack>
                                </Checkbox.Group>
                            )
                        }
                        if(item.type === "radio"){
                            return (
                                // <MultipleAnswerQuestions key={item.id || index}  question={item.question} answers={item.answers} type="radio"/>

                                <Radio.Group key={item.id || index} label={item.question} >
                                    <Stack gap="xs">
                                    {item.answers.map( (answer, index) => (
                                        <Radio key={item.id || index} value={answer} label={answer}/>
                                    ))}
                                    </Stack>
                                </Radio.Group>
                            )
                        }
                })
                }
                <Button type="submit" mt="md">Submit</Button>

                <Text mt="md">Submitted values:</Text>
                <Code block>{checkboxValues ? JSON.stringify(checkboxValues, null, 2) : '–'}</Code>
                </form>
            </Stack>
        </Container>
    )
}
