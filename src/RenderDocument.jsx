import { Text } from "@mantine/core"
import { Translator } from "./Translator"
import { useEffect, useState } from "react"

const RenderDocument = ({ text="your mother", targetLanguage="es" }) => {
    const [translatedText, setTranslatedText] = useState("");

    useEffect(() => {
        const translateText = async () => {
            try {
                console.log(text)
                const translatedText = await Translator(targetLanguage, text) ?? "err"
                setTranslatedText(translatedText)
            } catch (error) {
                console.error("Error loading or translating text:", error)
            }
        }
    
        // Don't run Translator if user has already selected english
        if (targetLanguage === "en") setTranslatedText(text)
        translateText();
    }, [targetLanguage])
    
    return <Text>{translatedText}</Text>
}

export default RenderDocument