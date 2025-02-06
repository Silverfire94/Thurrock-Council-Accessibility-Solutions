import { TextInput, Checkbox, Radio as Radio2, Stack, Group, Container, Button, Text, Code } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

export function FormGenerator() {
    const [value, setValue] = useState([])

    return (
        <Container size="xs" pt={60} pb={60}>
            <Stack justify='flex-start' align='stretch' gap="lg">
                <Checkbox.Group value={value} onChange={setValue}>
                    <Checkbox value="java" label="Java" />
                    <Checkbox value="python" label="Python" />
                </Checkbox.Group>
                <Button type="submit" mt="md">Submit</Button>

                <Text mt="md">Submitted values:</Text>
                <Code block>{value ? JSON.stringify(value, null, 2) : '–'}</Code>
            </Stack>
        </Container>
    )
}