import { useState } from "react";
import { Select } from "@mantine/core";
import TranslatedFormLoader from "./TranslateForm";

const LoadForm = () => {
    const [language, setLanguage] = useState("es")

    return (
        <div>
            <h1>Form Translator</h1>

            <Select label="Select language" data={[
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
                { value: "de", label: "German" }
                ]}
                value={language}
                onChange={setLanguage}
            />

            <TranslatedFormLoader targetLanguage={language} />
        </div>
    )
}

export default LoadForm;