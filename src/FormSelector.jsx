import { useState, useEffect } from "react";
import { Select, Loader, Space } from "@mantine/core";
import TranslateForm from "./TranslateForm";

const FormSelector = () => {
    const languageOptions = [
        { value: "af", label: "Afrikaans" },
        { value: "sq", label: "Albanian" },
        { value: "am", label: "Amharic" },
        { value: "ar", label: "Arabic" },
        { value: "hy", label: "Armenian" },
        { value: "az", label: "Azerbaijani" },
        { value: "bn", label: "Bengali" },
        { value: "bs", label: "Bosnian" },
        { value: "bg", label: "Bulgarian" },
        { value: "ca", label: "Catalan" },
        { value: "zh", label: "Chinese (Simplified)" },
        { value: "zh-TW", label: "Chinese (Traditional)" },
        { value: "hr", label: "Croatian" },
        { value: "cs", label: "Czech" },
        { value: "da", label: "Danish" },
        { value: "fa-AF", label: "Dari" },
        { value: "nl", label: "Dutch" },
        { value: "en", label: "English" },
        { value: "et", label: "Estonian" },
        { value: "fa", label: "Farsi (Persian)" },
        { value: "tl", label: "Filipino, Tagalog" },
        { value: "fi", label: "Finnish" },
        { value: "fr", label: "French" },
        { value: "fr-CA", label: "French (Canada)" },
        { value: "ka", label: "Georgian" },
        { value: "de", label: "German" },
        { value: "el", label: "Greek" },
        { value: "gu", label: "Gujarati" },
        { value: "ht", label: "Haitian Creole" },
        { value: "ha", label: "Hausa" },
        { value: "he", label: "Hebrew" },
        { value: "hi", label: "Hindi" },
        { value: "hu", label: "Hungarian" },
        { value: "is", label: "Icelandic" },
        { value: "id", label: "Indonesian" },
        { value: "ga", label: "Irish" },
        { value: "it", label: "Italian" },
        { value: "ja", label: "Japanese" },
        { value: "kn", label: "Kannada" },
        { value: "kk", label: "Kazakh" },
        { value: "ko", label: "Korean" },
        { value: "lv", label: "Latvian" },
        { value: "lt", label: "Lithuanian" },
        { value: "mk", label: "Macedonian" },
        { value: "ms", label: "Malay" },
        { value: "ml", label: "Malayalam" },
        { value: "mt", label: "Maltese" },
        { value: "mr", label: "Marathi" },
        { value: "mn", label: "Mongolian" },
        { value: "no", label: "Norwegian (Bokmål)" },
        { value: "ps", label: "Pashto" },
        { value: "pl", label: "Polish" },
        { value: "pt", label: "Portuguese (Brazil)" },
        { value: "pt-PT", label: "Portuguese (Portugal)" },
        { value: "pa", label: "Punjabi" },
        { value: "ro", label: "Romanian" },
        { value: "ru", label: "Russian" },
        { value: "sr", label: "Serbian" },
        { value: "si", label: "Sinhala" },
        { value: "sk", label: "Slovak" },
        { value: "sl", label: "Slovenian" },
        { value: "so", label: "Somali" },
        { value: "es", label: "Spanish" },
        { value: "es-MX", label: "Spanish (Mexico)" },
        { value: "sw", label: "Swahili" },
        { value: "sv", label: "Swedish" },
        { value: "ta", label: "Tamil" },
        { value: "te", label: "Telugu" },
        { value: "th", label: "Thai" },
        { value: "tr", label: "Turkish" },
        { value: "uk", label: "Ukrainian" },
        { value: "ur", label: "Urdu" },
        { value: "uz", label: "Uzbek" },
        { value: "vi", label: "Vietnamese" },
        { value: "cy", label: "Welsh" },
      ]      

    const [selectedForm, setSelectedForm] = useState("form2")
    const [targetLanguage, setTargetLanguage] = useState("en")
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
            <Select
                label="Select Language"
                data={languageOptions}
                value={targetLanguage}
                onChange={setTargetLanguage}
            />
            <Space h="xl"/>
            {loading && <Loader mt="md" />}
            {formSchema && !loading && <TranslateForm formSchema={formSchema} targetLanguage={targetLanguage} />}
        </div>
    )
}

export default FormSelector