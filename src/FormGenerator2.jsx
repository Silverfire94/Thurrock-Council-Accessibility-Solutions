import { TextInput, Checkbox, Radio, Stack, Group, Button, NumberInput, Select, Box } from '@mantine/core'
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
                                        data={field.data}
                                        {...form.getInputProps(field.name)}
                                    />
                                )
                            case "radio":
                                return (
                                    <div key={field.name}>
                                        <label>{field.label}</label>
                                        <Radio.Group {...form.getInputProps(field.name)}>
                                            <Stack gap={8}>
                                                {field.options.map((option) => (
                                                    <Radio key={option} value={option} label={option} />
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
                </Stack>
            </form>
        </Box>
    )
}

export default FormGenerator2