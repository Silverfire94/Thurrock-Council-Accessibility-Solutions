import { useState, useEffect } from "react";
import { Select, Loader } from "@mantine/core";
import FormGenerator2 from "./FormGenerator2";

const FormSelector = () => {
    const [selectedForm, setSelectedForm] = useState("form2")
    const [formSchema, setFormSchema] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSchema = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/${selectedForm}.json`)
                const schema = await response.json()
                setFormSchema(schema)
            } catch(error) {
                console.error("Error loading form schema:", error)
                setFormSchema(null)
            }
            setLoading(false)
        }

        fetchSchema()
    }, [selectedForm])

    return (
        <div>
            <Select
                label="Select a Form"
                value={selectedForm}
                onChange={setSelectedForm}
                data={[
                { value: "form1", label: "Form 1" },
                { value: "form2", label: "Form 2" },
                ]}
            />
            
            {loading && <Loader mt="md" />}
            {formSchema && !loading && <FormGenerator2 formSchema={formSchema} />}
        </div>
    )
}

export default FormSelector