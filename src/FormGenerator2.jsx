import { TextInput, Checkbox, Radio, Stack, Group, Button, NumberInput, Select, Box } from '@mantine/core'
import { Form, useForm } from '@mantine/form'
import { useState, useEffect } from "react"


const FormGenerator2 = ({ formSchema, targetLanguage }) => {
    const [lang, setLang] = useState(targetLanguage)

    const form = useForm({
        initialValues: formSchema.reduce((acc, field) => {
            acc[field.name] = field.type === "checkbox" ? [] : (field.type === "select" ? null : "");
            return acc;
        }, {})
    })

    useEffect(() => {
        if (lang != targetLanguage) {
            form.reset()
            setLang(targetLanguage)
        }
    });

    const handleSubmit = (values) => {
        let temp = {...values}
        console.log("Test", temp)
        form.reset()
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
                                        data={field.options}
                                        {...form.getInputProps(field.name)}
                                    />
                                )
                            case "radio":
                                return (
                                    <div key={field.name}>
                                        <label>{field.label}</label>
                                        <Radio.Group {...form.getInputProps(field.name)}>
                                            <Stack gap={8}>
                                                {field.options.map((option, index) => (
                                                    <Radio key={index} value={option} label={option} color="#3b943b" />
                                                ))}
                                            </Stack>
                                        </Radio.Group>
                                    </div>
                                )
                            case "checkbox":
                                return (
                                    <div key={field.name}>
                                        <label>{field.label}</label>
                                        <Group mt="xs">
                                            {field.options.map((option, index) => (
                                                <Checkbox
                                                    key={index}
                                                    color="#3b943b"
                                                    label={option}
                                                    checked={form.values[field.name].includes(index)}
                                                    onChange={(event) => {
                                                        const { checked } = event.target;
                                                        form.setFieldValue(
                                                            field.name,
                                                            checked
                                                            ? [...form.values[field.name], index]
                                                            : form.values[field.name].filter((v) => v !== index)
                                                        );
                                                    }}
                                                />
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

export default FormGenerator2