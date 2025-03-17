import { TextInput, Checkbox, Radio, Stack, Group, Button, NumberInput, Select, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import TTS from "./TTS"
import AudioRecorder from './AudioRecorder'
import React, { useState, useEffect } from 'react';

const FormGenerator = ({ formSchema, targetLanguage }) => {
    const [prevLang, setPrevLang] = useState("en");

    useEffect(() => {
        if (prevLang !== targetLanguage) {
            form.reset();
            setPrevLang(targetLanguage);
            // form.setFieldValue("name", "test")
            // form.getValues
        }
    }, [targetLanguage])
    
    const handleTranscriptionResult = (fieldName, result) => {
        form.setFieldValue(fieldName, result);
    };

    const form = useForm({
        initialValues: formSchema.reduce((acc, field) => {
            acc[field.name] = field.type === "checkbox" ? [] : (field.type === "select" ? null : "");
            return acc;
        }, {})
    })

    const handleSubmit = (values) => {
        console.log("Form submitted: ", values)
    }

    return (
        <Box mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                        
                    {formSchema.map((field => {
                        // let label = field.label
                        switch (field.type) {
                            case "text":
                                return (
                                    <div key={field.name}>           
                                        <TextInput  
                                            label={field.label}
                                            placeholder="Your placeholder text here"
                                            {...form.getInputProps(field.name)}
                                            inputContainer={(children) => (
                                                <Group align="flex-start">
                                                    {children}
                                                    <TTS text = {field.label} targetLanguage={targetLanguage}/>
                                                    <AudioRecorder targetLanguage={targetLanguage} whenResultReady={(result) => handleTranscriptionResult(field.name, result)} />
                                                </Group>
                                            )}
                                        />
                                    </div>
                                )
                            case "number":
                                return (
                                    <div key={field.name}>               
                                        
                                        <NumberInput
                                            // key={field.name}
                                            min={1}
                                            label={field.label}
                                            {...form.getInputProps(field.name)}
                                            inputContainer={(children) => (
                                                <Group align="flex-start">
                                                    {children}
                                                    <TTS  text = {field.label} targetLanguage={targetLanguage} />
                                                </Group>
                                            )}
                                        />
                                    </div> 
                                )
                            case "select":
                                return (
                                    <div key={field.name}>              
                                        <Select
                                            // key={field.name}
                                            label={field.label}
                                            data={field.data}
                                            {...form.getInputProps(field.name)}
                                            inputContainer={(children) => (
                                                <Group align="flex-start">
                                                    {children}
                                                    <TTS  text = {field.label} targetLanguage={targetLanguage} />
                                                </Group>
                                            )}
                                        />

                                    </div>
                                )
                            case "radio":
                                return (
                                    <Radio.Group 
                                        key={field.name} 
                                        label={
                                            <Group>
                                                {field.label}
                                                <TTS text={field.label + ". " + field.options.join('. ')} targetLanguage={targetLanguage} size="md"/>
                                            </Group>
                                        } 
                                        {...form.getInputProps(field.name)}
                                    >

                                        <Group mt="xs">
                                            {field.options.map((option,index) => (
                                                <Group key={index}>
                                                    <Radio key={option} value={option} label={option} color="#3b943b" />
                                                    {/* <TTS  text = {option} targetLanguage={targetLanguage} size="md"/> */}
                                                </Group>
                                            ))}
                                        </Group>
                                    </Radio.Group>
                                )
                            case "checkbox":
                                return (
                                    <div key={field.name}>
                                    <Group mb="xs">
                                        <div>{field.label}</div>
                                        <TTS text={field.label + ". " + field.options.join('. ')} targetLanguage={targetLanguage} size="md"/>
                                    </Group>

                                    <Group mt="xs">
                                        {field.options.map((option) => (
                                            <Group key={option}>
                                                <Checkbox
                                                    key={option}
                                                    color="#3b943b"
                                                    label={option}
                                                    checked={form.values[field.name]?.includes(option)}
                                                    onChange={(event) => {
                                                        const { checked } = event.currentTarget;
                                                        let currentValues = form.values[field.name] || [];
                                                        if(prevLang !== targetLanguage){
                                                            setPrevLang(targetLanguage)
                                                            currentValues = [];
                                                        }
                                                        form.setFieldValue(
                                                            field.name,
                                                            checked
                                                                ? [...currentValues, option]
                                                                : currentValues.filter((v) => v !== option)
                                                        );
                                                    }}
                                                />
                                            </Group>
                                            ))}
                                        </Group>
                                    </div>
                                )
                            default:
                                return null;
                        }
                    }))}
                    <Button type="submit" mt="md">Submit</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default FormGenerator