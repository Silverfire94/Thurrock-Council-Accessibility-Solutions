import { TextInput, Checkbox, Radio, Stack, Group, Button, NumberInput, Select, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

const FormGenerator2 = ({ formSchema, targetLanguage }) => {
    const form = useForm({
        initialValues: formSchema.reduce((acc, field) => {
            acc[field.name] = field.type === "checkbox" ? [] : "";
            return acc;
        }, {})
    })

    const handleSubmit = (values) => {
        // for(const val in values){
        //     if(Array.isArray(values[val])){
        //         formSchema.forEach((object) => {
        //             if(object["name"] == val){
        //                 let arr = [];
        //                 values[val].forEach((index) => {
        //                     arr.push(object["options"][index])
        //                 })
        //                 values[val] = arr;
        //             }
        //         })
        //     }
        // }
        console.log(values)
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
                                        options={field.options}
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
                                                    <Radio key={option} value={option} label={option} color="#3b943b" />
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