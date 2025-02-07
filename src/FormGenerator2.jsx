import { TextInput, Checkbox, Radio, Stack, Group, Container, Button, Text, Code, NumberInput, Select } from '@mantine/core'
import { useForm } from '@mantine/form'

const FormGenerator2 = ({ formSchema }) => {
    const form = useForm({
        initialValues: formSchema.reduce((acc, field) => {
            acc[field.name] = field.type === "checkbox" ? [] : "";
            return acc;
        }, {})
    })

    const handleSubmit = (values) => {
        console.log("Form submitted: ", values)
    }

    return (
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
                        case "radio":
                            return (
                                <div key={field.name}>
                                    <label>{field.label}</label>
                                    <Radio.Group {...form.getInputProps(field.name)}>
                                        {field.options.map((option) => (
                                            <Radio key={option} value={option} label={option} />
                                        ))}
                                    </Radio.Group>
                                </div>
                            )
                        case "checkbox":
                            return (
                                <div key={field.name}>
                                    <label>{field.label}</label>
                                    <Group mt="xs">
                                        {field.options.map((option) => (
                                            <Checkbox
                                                key={option}
                                                label={option}
                                                checked={form.values[field.name].includes(option)}
                                                onChange={(event) => {
                                                const { checked } = event.target;
                                                form.setFieldValue(
                                                    field.name,
                                                    checked
                                                    ? [...form.values[field.name], option]
                                                    : form.values[field.name].filter((v) => v !== option)
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
            </form>
        </Stack>
    )
}

export default FormGenerator2