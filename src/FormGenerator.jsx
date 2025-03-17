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
                        switch (field.type) {
                            case "text":
                                return (        
                                    <TextInput  
                                        key={field.name}
                                        label={field.label}
                                        {...form.getInputProps(field.name)}
                                        inputContainer={(children) => (
                                            <Group align="flex-start">
                                                {children}
                                                <TTS text = {field.label} targetLanguage={targetLanguage}/>
                                                <AudioRecorder targetLanguage={targetLanguage} whenResultReady={(result) => handleTranscriptionResult(field.name, result)} />
                                            </Group>
                                        )}
                                    />
                                )
                            case "number":
                                return (
                                    <NumberInput
                                        key={field.name}
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
                                )
                            case "select":
                                return (         
                                    <Select
                                        key={field.name}
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
                                                </Group>
                                            ))}
                                        </Group>
                                    </Radio.Group>
                                )
                            case "checkbox":
                                return (
                                    <Checkbox.Group
                                        key={field.name}
                                        label={
                                            <Group>
                                                {field.label}
                                                <TTS text={field.label + ". " + field.options.join('. ')} targetLanguage={targetLanguage} size="md"/>
                                            </Group>
                                        }
                                        value={form.values[field.name]}
                                        onChange={(value) => form.setFieldValue(field.name, value)}
                                    >
                                        <Group mt="xs">
                                            {field.options.map((option) => (
                                                <Checkbox
                                                    key={option}
                                                    color="#3b943b"
                                                    label={option}
                                                    value={option}
                                                />
                                            ))}
                                        </Group>
                                    </Checkbox.Group>
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