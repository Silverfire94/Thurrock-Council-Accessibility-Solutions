import { TextInput, Checkbox, Radio as Radio2, Stack, Group, Container, Button, Text, Code, NumberInput, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

const formSchema = [
    { name: "name", label: "Name", type: "text" },
    { name: "age", label: "Age", type: "number" },
    { name: "gender", label: "Gender", type: "select", data: ["Male", "Female", "Other"] }
]

export function FormGenerator() {
    const form = useForm({
        initialValues: formSchema.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {})
    })

    const handleSubmit = (values) => {
        console.log("Form submitted: ", values)
    }

    return (
        <Container size="xs" pt={60} pb={60}>
            <Stack justify='flex-start' align='stretch' gap="lg">

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    {formSchema.map((field => {
                        switch (field.type) {
                            case "text":
                                return (
                                    <TextInput
                                        key={field.name}
                                        label={field.label}
                                        {...form.getInputProps(field.name)} 
                                    />
                                )
                            case "number":
                                return (
                                    <NumberInput
                                        key={field.name}
                                        label={field.label}
                                        {...form.getInputProps(field.name)}
                                    />
                                )
                            case "select":
                                return (
                                    <Select
                                        key={field.name}
                                        label={field.label}
                                        data={field.data}
                                        {...form.getInputProps(field.name)}
                                    />
                                )
                            default:
                                return null;
                        }
                    }))}
                    <Button type="submit" mt="md">Submit</Button>
                </form>
            </Stack>
        </Container>
    )
}