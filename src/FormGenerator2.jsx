import { TextInput, Checkbox, Radio, Stack, Group, Button, NumberInput, Select, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import TextSimplificator from "./TextSimplificator"
import TTS from "./TTS"

const FormGenerator2 = ({ formSchema, targetLanguage }) => {
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
                        // let label = field.label
                        switch (field.type) {
                            case "text":
                                return (
                                    <div key={field.name}>           
                                        <TTS  text = {field.label} targetLanguage={targetLanguage} />
                                        <TextInput

                                    
                                            label={field.label}
                                            {...form.getInputProps(field.name)} 
                                        />
                                    </div>
                                )
                            case "number":
                                return (
                                    <div key={field.name}>               
                                        <TTS  text = {field.label} targetLanguage={targetLanguage} />
                                        <NumberInput
                                            // key={field.name}
                                            label={field.label}
                                            {...form.getInputProps(field.name)}
                                        />
                                    </div> 
                                )
                            case "select":
                                return (
                                    <div key={field.name}>              
                                        <TTS  text = {field.label} targetLanguage={targetLanguage} />
                                        <Select
                                            // key={field.name}
                                            label={field.label}
                                            data={field.data}
                                            {...form.getInputProps(field.name)}
                                        />
                                    </div>
                                )
                            case "radio":
                                return (
                                    <div key={field.name}>
                                        
                                        <label id="label">{field.label}
                                        <TTS  text = {field.label} targetLanguage={targetLanguage} />
                                        </label>

                                        <Radio.Group {...form.getInputProps(field.name)}>
                                            <Stack gap={8}>
                                                {field.options.map((option,index) => (
                                                    <div key = {index}>
                                                        <TTS  text = {option} targetLanguage={targetLanguage} />
                                                        <Radio key={option} value={option} label={option} color="#3b943b" />
                                                    </div>
                                                ))}
                                            </Stack>
                                        </Radio.Group>
                                    </div>
                                )
                            case "checkbox":
                                return (
                                    <div key={field.name}>
                                        <TTS  text = {field.label} targetLanguage={targetLanguage} />
                                        <label>{field.label}</label>
                                        <Group mt="xs">
                                            {field.options.map((option) => (
                                                <div key = {option}>
                                                    <TTS  text = {option} targetLanguage={targetLanguage} />
                                                    <Checkbox
                                                        key={option}
                                                        color="#3b943b"
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
                                                 </div>
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