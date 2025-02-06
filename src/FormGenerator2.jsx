import { TextInput, Checkbox, Radio as Radio2, Stack, Group, Container, Button, Text, Code } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

export function FormGenerator() {
    const [value, setValue] = useState([])

    const form = useForm({
        initialValues: {
            group1: [],
            group2: [],
            text1: "",
            radio: "",
        },
    })

    const handleCheckboxChange = (group) => (event) => {
        form.setFieldValue(group, event.target.checked 
            ? [...form.values[group], event.target.value] 
            : form.values[group].filter((item) => item != event.target.value)
        )
    }

    const handleRadioChange = (event) => {
        form.setFieldValue("radio", event.target.value)
    }

    const handleTextAreaChange = (event) => {
        form.setFieldValue("text1", event.target.value)
    }

    return (
        <Container size="xs" pt={60} pb={60}>
            <Stack justify='flex-start' align='stretch' gap="lg">

                <Checkbox.Group key="box1" value={value} onChange={setValue}>
                    <Checkbox value="java" label="Java" checked={form.values.group1.includes("java")} onChange={handleCheckboxChange("group1")}/>
                    <Checkbox value="python" label="Python" />
                </Checkbox.Group>

                <Checkbox.Group key="box2" value={value} onChange={setValue}>
                    <Checkbox value="windows" label="Windows" />
                    <Checkbox value="linux" label="Linux" />
                    <Checkbox value="macos" label="MacOS" />
                </Checkbox.Group>

                <Button type="submit" mt="md">Submit</Button>

                <Text mt="md">Submitted values:</Text>
                <Code block>{value ? JSON.stringify(value, null, 2) : '–'}</Code>
            </Stack>
        </Container>
    )
}